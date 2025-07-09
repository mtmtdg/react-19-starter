import { valibotResolver } from '@hookform/resolvers/valibot';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import * as v from 'valibot';

import {
  FormFieldCheckbox,
  FormFieldCheckboxGroup,
  FormFieldDatePicker,
  FormFieldDateTimePicker,
  FormFieldRadioGroup,
  FormFieldSelect,
  FormFieldSwitch,
  FormFieldText,
  SubmitButton,
  useInitCheckForm,
} from '@/components/form-tools';

const testSchema = v.pipe(
  v.object({
    username: v.pipe(v.string(), v.nonEmpty(), v.minLength(2)),
    email: v.pipe(v.string(), v.nonEmpty(), v.email()),
    password: v.pipe(v.string(), v.nonEmpty(), v.minLength(6)),
    confirmPassword: v.pipe(v.string(), v.nonEmpty()),
    rememberMe: v.boolean(),
    newsletter: v.boolean(),
    terms: v.boolean(),
    leftLabel: v.boolean(),
    rightLabel: v.boolean(),
    notifications: v.boolean(),
    darkMode: v.boolean(),
    leftSwitch: v.boolean(),
    rightSwitch: v.boolean(),
    birthDate: v.nullable(v.date()),
    appointmentDateTime: v.nonNullish(v.date()),
    country: v.nonNullish(v.string()),
    city: v.nullable(v.number()),
    gender: v.number(),
    language: v.string(),
    age: v.nullable(v.number()),
    hobbies: v.array(v.string()),
    skills: v.array(v.number()),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      '密码和确认密码不匹配',
    ),
    ['confirmPassword'],
  ),
);

type TestFormInput = v.InferInput<typeof testSchema>;
type TestFormOutput = v.InferOutput<typeof testSchema>;

const countryItems = [
  { value: 'cn', name: '中国' },
  { value: 'us', name: '美国' },
  { value: 'jp', name: '日本' },
  { value: 'kr', name: '韩国' },
  { value: 'de', name: '德国' },
];

const cityItems = [
  { value: 10001, name: '北京' },
  { value: 10002, name: '上海' },
  { value: 10003, name: '广州' },
  { value: 10004, name: '深圳' },
  { value: 10005, name: '杭州' },
];

const hobbyItems = [
  { value: 'reading', name: '阅读' },
  { value: 'music', name: '音乐' },
  { value: 'sports', name: '运动' },
  { value: 'travel', name: '旅行' },
  { value: 'gaming', name: '游戏' },
  { value: 'cooking', name: '烹饪' },
];

const skillItems = [
  { value: 101, label: 'JavaScript' },
  { value: 102, label: 'TypeScript' },
  { value: 103, label: 'React' },
  { value: 104, label: 'Vue' },
  { value: 105, label: 'Angular' },
  { value: 106, label: 'Node.js' },
];

const genderItems = [
  { value: 1, name: '男' },
  { value: 2, name: '女' },
  { value: 3, name: '其他' },
];

const languageItems = [
  { value: 'zh', title: '中文' },
  { value: 'en', title: 'English' },
  { value: 'ja', title: '日本語' },
  { value: 'ko', title: '한국어' },
];

// eslint-disable-next-line max-lines-per-function, max-statements
export function FormTest() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useInitCheckForm<TestFormInput>({
    resolver: valibotResolver(testSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      newsletter: false,
      terms: false,
      leftLabel: false,
      rightLabel: false,
      notifications: false,
      darkMode: false,
      leftSwitch: false,
      rightSwitch: false,
      birthDate: null,
      appointmentDateTime: undefined,
      country: undefined,
      city: 10003,
      gender: 1,
      language: '',
      age: null,
      hobbies: [],
      skills: [101, 103],
    },
  });

  // 监听复选框组的值变化
  const hobbies = useWatch({ control, name: 'hobbies' });
  const skills = useWatch({ control, name: 'skills' });
  // 监听单选按钮组的值变化
  const gender = useWatch({ control, name: 'gender' });
  const language = useWatch({ control, name: 'language' });
  // 监听下拉选择器的值变化
  const country = useWatch({ control, name: 'country' });
  const city = useWatch({ control, name: 'city' });
  // 监听日期字段的值变化
  const birthDate = useWatch({ control, name: 'birthDate' });
  const appointmentDateTime = useWatch({ control, name: 'appointmentDateTime' });
  // 监听所有表单值
  const formValues = useWatch({ control });

  const onSubmit = (data: TestFormOutput) => {
    // biome-ignore lint/suspicious/noConsole: 调试用途，需要在控制台输出
    console.log('Validated form data:', data);
    // 这里的data是经过schema验证和转换后的clean数据
    alert('表单提交成功！请查看控制台');
  };

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Typography variant='h3' component='h1' gutterBottom>
        表单组件测试页面
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, mt: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={3} noValidate>
              <Typography variant='h5' gutterBottom>
                用户注册表单
              </Typography>

              <FormFieldText name='username' control={control} label='用户名' placeholder='请输入用户名' required />

              <FormFieldText
                name='email'
                control={control}
                type='email'
                label='邮箱地址'
                placeholder='请输入邮箱'
                required
              />

              <FormFieldText
                name='password'
                control={control}
                type='password'
                label='密码'
                placeholder='请输入密码'
                required
              />

              <FormFieldText
                name='confirmPassword'
                control={control}
                type='password'
                label='确认密码'
                placeholder='请再次输入密码'
                required
              />

              <FormFieldCheckbox name='rememberMe' control={control} label='记住我' />

              <FormFieldCheckbox name='newsletter' control={control} label='订阅邮件通知' />

              <FormFieldCheckbox name='terms' control={control} label='我已阅读并同意用户协议' />

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                标签位置测试
              </Typography>

              <FormFieldCheckbox name='leftLabel' control={control} label='左侧标签' labelPlacement='start' />

              <FormFieldCheckbox name='rightLabel' control={control} label='右侧标签' labelPlacement='end' />

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                Switch开关测试
              </Typography>

              <FormFieldSwitch name='notifications' control={control} label='推送通知' />

              <FormFieldSwitch name='darkMode' control={control} label='深色模式' />

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                Switch标签位置测试
              </Typography>

              <FormFieldSwitch name='leftSwitch' control={control} label='左侧开关' labelPlacement='start' />

              <FormFieldSwitch name='rightSwitch' control={control} label='右侧开关' labelPlacement='end' />

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                日期选择器测试
              </Typography>

              <FormFieldDatePicker name='birthDate' control={control} label='出生日期' placeholder='请选择出生日期' />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的出生日期 (Date 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(birthDate)}
                </Typography>
              </Box>

              <FormFieldDateTimePicker
                name='appointmentDateTime'
                control={control}
                label='预约时间'
                placeholder='请选择预约时间'
              />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的预约时间 (Date 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(appointmentDateTime)}
                </Typography>
              </Box>

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                下拉选择器测试
              </Typography>

              <FormFieldSelect
                name='country'
                control={control}
                label='国家'
                placeholder='请选择国家'
                items={countryItems}
                bindValue='value'
                bindLabel='name'
                required
              />

              <FormFieldSelect
                name='city'
                control={control}
                label='城市'
                placeholder='请选择城市'
                items={cityItems}
                bindValue='value'
                bindLabel='name'
                allowClear
              />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的国家 (string 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(country, null, 2)}
                </Typography>
              </Box>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的城市 (number 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(city, null, 2)}
                </Typography>
              </Box>

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                单选按钮组测试
              </Typography>

              <FormFieldRadioGroup
                name='gender'
                control={control}
                label='性别'
                items={genderItems}
                bindValue='value'
                bindLabel='name'
                required
              />

              <FormFieldRadioGroup
                name='language'
                control={control}
                label='偏好语言'
                items={languageItems}
                bindValue='value'
                bindLabel='title'
                row
              />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的性别 (number 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(gender, null, 2)}
                </Typography>
              </Box>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的偏好语言 (string 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(language, null, 2)}
                </Typography>
              </Box>

              <FormFieldText name='age' control={control} type='number' label='年龄' placeholder='请输入年龄' />

              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                复选框组测试
              </Typography>

              <FormFieldCheckboxGroup
                name='hobbies'
                control={control}
                label='兴趣爱好'
                items={hobbyItems}
                bindValue='value'
                bindLabel='name'
              />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的兴趣爱好 (string[] 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(hobbies, null, 2)}
                </Typography>
              </Box>

              <FormFieldCheckboxGroup
                name='skills'
                control={control}
                label='技能栈'
                items={skillItems}
                bindValue='value'
                bindLabel='label'
                row
              />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  已选择的技能栈 (number[] 类型):
                </Typography>
                <Typography variant='body2' component='pre' sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {JSON.stringify(skills, null, 2)}
                </Typography>
              </Box>

              <SubmitButton control={control} variant='contained' size='large' sx={{ py: 1.5, mt: 3 }}>
                提交注册
              </SubmitButton>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ flex: 1, minWidth: '300px' }}>
          <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50', position: 'sticky', top: 16 }}>
            <Typography variant='h6' gutterBottom>
              调试信息
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                所有表单错误:
              </Typography>
              <Typography
                variant='body2'
                component='pre'
                sx={{
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  maxHeight: '600px',
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(errors, null, 2)}
              </Typography>
            </Box>

            <Box>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                所有表单值:
              </Typography>
              <Typography
                variant='body2'
                component='pre'
                sx={{
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  maxHeight: '600px',
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(formValues, null, 2)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
