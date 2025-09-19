import * as ServerApi from './serverApi'
import * as LocalApi from './localApi'
import type { Get, Post, Put, Delete } from './types'

console.log(process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE)

const get: Get = process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === 'true' ? LocalApi.get : ServerApi.get
const post: Post = process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === 'true' ? LocalApi.post : ServerApi.post
const put: Put = process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === 'true' ? LocalApi.put : ServerApi.put
const del: Delete = process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === 'true' ? LocalApi.del : ServerApi.del

const api = { get, post, put, del }
export default api