import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { XCircle } from "lucide-react";

// Validation schema
const formSchema = z.object({
  client_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits." }),
  location: z.string().min(2, { message: "Enter a valid location." }),
  budget: z
    .number({
      required_error: "Please enter your estimated budget.",
    })
    .min(0, { message: "Budget must be greater than 0." }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ArchitectForm() {
  const { toast } = useToast();
  const [showPopup, setShowPopup] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client_name: "",
      phoneNumber: "",
      location: "",
      budget: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = await supabase.from("ArchitectRequest").insert({
        arcID: null,
        client_name: data.client_name,
        phoneNumber: data.phoneNumber,
        location: data.location,
        budget: data.budget,
        message: data.message,
        status: "Pending",
      });

      if (error) throw error;

      toast({
        title: "Application Submitted 🎉",
        description: "Your request has been sent successfully!",
      });

      setShowPopup(true); // Show popup
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
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-gray-100">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Apply as a Professional
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="client_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        inputMode="numeric"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city or area"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Budget (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50000"
                      className="h-11"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message / Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              Submit Application
            </Button>
          </form>
        </Form>
      </div>

      {/*  Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              <XCircle size={24} />
            </button>
            <h3 className="text-2xl font-semibold text-green-600 mb-3">
              🎉 Thank You!
            </h3>
            <p className="text-gray-600 text-lg">
              Your application has been submitted successfully.  
              <span className="block mt-2 text-blue-600 font-medium">
                We’ll contact you soon!
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
