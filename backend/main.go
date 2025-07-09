package main

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	echoJWT "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type TokenResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type User struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

type CustomClaims struct {
	User      User   `json:"user"`
	TokenType string `json:"tokenType"`
	jwt.RegisteredClaims
}

const (
	TokenTypeAccess  = "access"
	TokenTypeRefresh = "refresh"
)

var (
	jwtSecret            = []byte("your-secret-key-change-this-in-production")
	accessTokenDuration  = time.Hour
	refreshTokenDuration = 24 * time.Hour
)

func main() {
	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.POST("/api/login", loginHandler)
	e.POST("/api/refresh", refreshHandler)

	jwtMiddleware := echoJWT.WithConfig(echoJWT.Config{
		SigningKey: jwtSecret,
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return &CustomClaims{}
		},
	})
	protected := e.Group("/api")
	protected.Use(jwtMiddleware)
	protected.POST("/logout", logoutHandler)
	protected.GET("/hello", helloHandler)

	e.Logger.Fatal(e.Start(":8080"))
}

func loginHandler(c echo.Context) error {
	var req LoginRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid JSON")
	}

	if req.Username != req.Password {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}

	// 模拟处理时间（故意等待1秒）
	time.Sleep(1 * time.Second)

	// 创建用户信息
	user := User{
		ID:    req.Username,
		Email: req.Username + "@example.com",
		Name:  req.Username,
	}

	accessToken, err := generateAccessToken(user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate token")
	}

	refreshToken, err := generateRefreshToken(user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate refresh token")
	}

	response := TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	return c.JSON(http.StatusOK, response)
}

func refreshHandler(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	if authHeader == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "Authorization header required")
	}

	tokenString := authHeader
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		tokenString = authHeader[7:]
	}

	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (any, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid refresh token")
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token claims")
	}

	if claims.TokenType != TokenTypeRefresh {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token type")
	}

	user := claims.User

	newAccessToken, err := generateAccessToken(user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate new token")
	}

	newRefreshToken, err := generateRefreshToken(user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate new refresh token")
	}

	response := TokenResponse{
		AccessToken:  newAccessToken,
		RefreshToken: newRefreshToken,
	}

	return c.JSON(http.StatusOK, response)
}

func logoutHandler(c echo.Context) error {
	// 由于 JWT 是无状态的，服务端无法真正"注销" token
	// 在实际应用中，可能需要维护一个黑名单或使用较短的过期时间
	// 这里只是返回成功响应，实际的注销逻辑由客户端处理（清除本地 token）
	return c.JSON(http.StatusOK, map[string]any{
		"message": "Logout successful",
	})
}

func helloHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{
		"message": "Hi!",
	})
}

func generateAccessToken(user User) (string, error) {
	claims := &CustomClaims{
		User:      user,
		TokenType: TokenTypeAccess,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(accessTokenDuration)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func generateRefreshToken(user User) (string, error) {
	claims := &CustomClaims{
		User:      user,
		TokenType: TokenTypeRefresh,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(refreshTokenDuration)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
