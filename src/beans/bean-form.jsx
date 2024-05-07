import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  flavor: z.string().min(2, {
    message: "Flavor must be at least 2 characters.",
  }),  
})

export default function BeanForm({editing, editingBean, adding, setEditing, setAdding, data, setData}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: Object.keys(editingBean).length>0?editingBean:{
            name: "",
            color: "",
            flavor: "",
        },
    })
     

    function onSubmit(values) {
        adding && setData(data.length>0?[...data, {...values, key: data.length+1}]:[{...values, key: 1}]);
        adding && setAdding(false);
        if (editing) {
            const beanArray = [...data];
            beanArray.splice(editingBean.key-1, 1, values);
            setData(beanArray);
        }
        editing && setEditing(false);
        console.log(values)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jelly Bean Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Jelly Bean Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flavor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor</FormLabel>
              <FormControl>
                <Input placeholder="Flavor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
