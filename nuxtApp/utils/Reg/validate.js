/**
   * @author ff
   * @date 2021/3/23
   * @Description:校验封装
   * @update by:
    * 使用方式 1、 app_id: REQUIRED('请输入公众号'),
    * 2、 newPwd: [REQUIRED('请输入新密码'), { validator: RULES.password }],
 */

import { regExp } from './regExp'

export const RULES = {
  // 用户名
  username(rule, value, callback) {
    if (!regExp.username.test(value)) {
      callback(new Error('请输入正确手机号码'))
    } else {
      callback()
    }
  },
  // 密码
  password(rule, value, callback) {
    if (!regExp.password.test(value)) {
      callback(new Error('密码由6位以上，至少为字母、数字、符号两种组成'))
    } else {
      callback()
    }
  },
  // 数字带小数点
  number(rule, value, callback) {
    if (!regExp.number.test(value)) {
      callback(new Error('请输入数字'))
    } else {
      callback()
    }
  },
  // 邮箱
  email(rule, value, callback) {
    if (!regExp.email.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}

export function REQUIRED(msg = '必填项', trigger = 'blur') { // 如果是必填项在规则数组中加上REQUIRED()
  return {
    required: true,
    message: msg,
    trigger
  }
}

