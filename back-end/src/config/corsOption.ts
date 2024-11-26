import { CorsOptions } from "cors"

const whiteList = [process.env.FRONT_END_BASE_URL, "http://localhost:4173"]

export const corsOptions:CorsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?:boolean) => void) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }