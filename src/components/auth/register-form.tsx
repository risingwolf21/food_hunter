import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useApplication } from '@/contexts/application-context'

const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72),
})

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const { signUp } = useApplication()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: '', email: '', password: '' },
  })

  async function onSubmit(values: RegisterValues) {
    setIsSubmitting(true)
    const error = await signUp(values.email, values.password, values.full_name)
    setIsSubmitting(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Account created successfully')
      navigate('/dashboard')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Smith" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Min. 8 characters" type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account' : 'Create Account'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {'Already have an account?'}{' '}
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  )
}
