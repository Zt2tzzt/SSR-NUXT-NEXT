import { NextRequest, NextResponse } from 'next/server'

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req: NextRequest) {
  // console.log('req:', req)

  // 2.返回next()
  // return NextResponse.next(); // 返回next 和 没有返回的效果是一样，直接放行

  // 3.返回的 重定向
  /* const token = req.cookies.get("token")?.value;
  if (!token && req.nextUrl.pathname !== "/login") {
    // 重定向到登录页面
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  } */

  // 4.返回的 重写 ->  vue.config  devServer-> proxy
  if (req.nextUrl.pathname.startsWith('/juanpi/api')) {
    // http://locahost:3000/juanpi/api/homeInfo?id=100
    // 重写 url 为下面的 url
    // http://codercba.com:9060/juanpi/api/homeInfo?id=100
    return NextResponse.rewrite(new URL(req.nextUrl.pathname, 'http://codercba.com:9060'))
  }
}

// 匹配器，用于过滤
export const config = {
  // (?!_next)  匹配不包含 _next 路径
  matcher: ['/((?!_next/static|api|favicon.ico).*)']
}
