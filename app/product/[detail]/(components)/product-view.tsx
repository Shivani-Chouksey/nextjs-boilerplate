import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function ProductView() {
  const router=useRouter()
  return (
      <Card className="  bg-gray-900 text-white rounded-lg shadow-lg ">
        <CardHeader className=" p-4 rounded-t-lg ">
          <CardTitle className="text-xl font-semibold">Card Title</CardTitle>
          {/* <CardDescription className="text-sm text-gray-400">Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="p-4 text-gray-400">
          <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere obcaecati iste necessitatibus quidem explicabo sed voluptatibus adipisci fuga iure ut.</p>
        </CardContent>
        <CardFooter className=" p-4 rounded-b-lg">
         <Button variant="outline" onClick={()=>router.push("product/1")}>View Detail</Button>
        </CardFooter>
      </Card>
  )
}

export default ProductView
