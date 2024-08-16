import { Pen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form'
import { useNotifications } from '@/components/ui/notifications'
import { useUser } from '@/lib/auth'

import {
  updateProfileInputSchema,
  useUpdateProfile
} from '../api/update-profile'

export const UpdateProfile = () => {
  const user = useUser()
  const { addNotification } = useNotifications()
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated'
        })
      }
    }
  })

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={values => {
          updateProfileMutation.mutate({ data: values })
        }}
        options={{
          defaultValues: {
            first_name: user.data?.first_name ?? '',
            last_name: user.data?.last_name ?? '',
            email: user.data?.email ?? '',
            bio: user.data?.bio ?? ''
          }
        }}
        schema={updateProfileInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="First Name"
              error={formState.errors['first_name']}
              registration={register('first_name')}
            />
            <Input
              label="Last Name"
              error={formState.errors['last_name']}
              registration={register('last_name')}
            />
            <Input
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <Textarea
              label="Bio"
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  )
}
