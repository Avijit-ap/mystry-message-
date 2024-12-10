'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';


const page = () => {
    const router=useRouter()
    const params=useParams<{username:string}>()
    const toast=useToast()
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
      });
    
     const onSubmit=async (data:z.infer<typeof verifySchema>) => {
        try {
            const response= await axios.post(`/api/verify-code`,{
                    username:params.username,
                    code:data.code,
                }
            );
            toast:{
                title:" Verify code sucess"
                description:response.data.message
            }
            router.replace("sign-up");
            }
            catch (error) {
                const axiosError=error as AxiosError<ApiResponse>
                let errorMessage = axiosError.response?.data.message;
                ('There was a problem with your sign-up. Please try again.');
      
                toast:({
                    title: 'Verification Failed',
                    description:errorMessage,
                    variant:'destructive',
                })
              }
     }
     return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Verify Your Account
              </h1>
              <p className="mb-4">Enter the verification code sent to your email</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Verify</Button>
              </form>
            </Form>
          </div>
        </div>
      );
    }

export default page