import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug: Log environment variables (remove in production)
      console.log('EmailJS Config Check:', {
        hasServiceId: !!serviceId,
        hasTemplateId: !!templateId,
        hasPublicKey: !!publicKey,
        serviceId: serviceId?.substring(0, 10) + '...',
        templateId: templateId?.substring(0, 10) + '...',
        publicKey: publicKey?.substring(0, 10) + '...',
      });

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration missing:', { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey });
        throw new Error('EmailJS is not configured. Please set up EmailJS credentials in .env file and restart the dev server.');
      }

      // Initialize EmailJS with public key (must be done before sending)
      emailjs.init(publicKey);

      // Prepare template parameters
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        company: values.company || 'Not provided',
        phone: values.phone || 'Not provided',
        message: values.message,
        to_name: 'AutoAny Team', // Recipient name
      };

      // Send email with timeout
      const sendPromise = emailjs.send(serviceId, templateId, templateParams);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout. Please try again.')), 30000)
      );
      
      await Promise.race([sendPromise, timeoutPromise]);

      // Success
      setSubmitStatus('success');
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      // Better error messages
      let errorMsg = 'Failed to send message. Please try again or contact us directly.';
      
      // Check for network/CORS errors first
      const errorString = error?.toString() || '';
      const errorMessage = error?.message || '';
      
      if (errorString.includes('fetch') || errorMessage.includes('fetch') || errorString.includes('Failed to fetch')) {
        errorMsg = 'Network error. Please check your internet connection. If the problem persists, check EmailJS dashboard settings or contact support.';
      } else if (error?.status === 0 || error?.status === '0') {
        errorMsg = 'Network error. Unable to connect to email service. Please check your internet connection.';
      } else if (error?.text) {
        // EmailJS specific error
        if (error.text.includes('insufficient authentication') || error.text.includes('412')) {
          errorMsg = 'Email service authentication error. Please reconnect your Gmail service in EmailJS dashboard.';
        } else if (error.text.includes('Invalid') || error.text.includes('400')) {
          errorMsg = 'Invalid configuration. Please verify EmailJS Service ID, Template ID, and Public Key in .env file.';
        } else if (error.text.includes('413') || error.text.includes('429')) {
          errorMsg = 'Email service limit reached. Please try again later or contact support.';
        } else {
          errorMsg = error.text;
        }
      } else if (errorMessage) {
        errorMsg = errorMessage;
      } else if (typeof error === 'string') {
        errorMsg = error;
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#41B8D5]"
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
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
                  <FormLabel className="text-white">Email *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#41B8D5]"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#41B8D5]"
                      placeholder="Company name"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#41B8D5]"
                      placeholder="Phone number"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#41B8D5] resize-none"
                    placeholder="Tell us about your automation needs..."
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#41B8D5] hover:bg-[#41B8D5]/90 text-white text-base font-semibold py-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>Message sent successfully! We'll get back to you soon.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold mb-1">Error sending message</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

