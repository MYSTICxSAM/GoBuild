
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  Name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  Age: z.number().min(18, { message: "You must be at least 18 years old." }).max(100),
  Experience: z.number().min(0, { message: "Experience must be 0 or more years." }),
  MobileNo: z.number().min(1000000000, { message: "Please enter a valid mobile number." }),
  Area: z.string().min(2, { message: "Area must be at least 2 characters." }),
  Skill: z.string().min(2, { message: "Skill must be at least 2 characters." }),
  Description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function ApplyAsProfessionalForm() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Age: undefined,
      Experience: undefined,
      MobileNo: undefined,
      Area: "",
      Skill: "",
      Description:"",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Make sure MobileNo is present before submitting
      if (!data.MobileNo) {
        toast({
          title: "Error",
          description: "Mobile number is required",
          variant: "destructive",
        });
        return;
      }

      // Insert a single object, not an array
      const { error } = await supabase
        .from('GoBuild')
        .insert(data);

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Thank you for applying to be a professional on GoBuild!",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="Age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="25" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="5" 
                    {...field}
                    onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="MobileNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="1234567890" 
                  {...field}
                  onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area/Location</FormLabel>
              <FormControl>
                <Input placeholder="City, State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Skill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Skill</FormLabel>
              <FormControl>
                <Input placeholder="Plumbing, Electrical, Carpentry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  );
}
