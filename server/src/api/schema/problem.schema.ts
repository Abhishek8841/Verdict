import z from "zod";


export const idSchema = z.cuid();

export const slugSchema = z.string();


export type idType = z.infer<typeof idSchema>
export type slugType = z.infer<typeof slugSchema>