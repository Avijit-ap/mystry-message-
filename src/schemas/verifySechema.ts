import {z} from 'zod';

export const verifySchema=z.object({
    verifyingCode:z.string().length(6,{message:"Verifying code must be 6 characters long"})
})