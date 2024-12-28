import Input from '@/components/Input';
import ButtonPrimary from '@/components/layout/ButtonPrimary';


function ContactForm() {
    return (
        <form className="bg-light-SBackground dark:bg-dark-SBackground p-8">
        <Input 
            type={"text"}
            label={"Name"} 
        />

         <Input 
            type={"text"}
            label={"Email"} 
        />
         <Input 
            type={"text"}
            label={"Message"} 
        />

        <ButtonPrimary type="submit" title="Send" />

    </form>
    )
}


export default ContactForm;