export function Home() {
  // 简单的内联样式示例
  const containerStyle = {
    textAlign: 'center' as const,
    padding: '2rem',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    border: '1px solid #007bff',
    borderRadius: '4px',
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <h1>React 19 Starter</h1>
      <p>一个现代化的React应用模板</p>

      <div>
        <a href='/login' style={linkStyle}>
          登录
        </a>

        <a href='/dashboard' style={linkStyle}>
          进入应用
        </a>
      </div>
    </div>
  );
}
