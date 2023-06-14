// 根据文件名，自动加载
/* export default function () {
  return useState('counter', () => 100)
} */

// 根据函数名，自动加载。
export const useCounter = () => {
  return useState('counter', () => 100)
}