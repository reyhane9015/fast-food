import Input from '@/components/Input';
import ButtonPrimary from '@/components/layout/ButtonPrimary';


function ContactForm() {
    return (
        <form className="bg-light-SBackground dark:bg-dark-SBackground p-8">
        <Input 
            type={"text"}
            label={"Name"} 
            // placeholder={"** ** ** **"} 
            // value={name} 
            // onChange={(e) => setCardNumber(e.target.value)}
            // isSaving={isSaving}
            // disabled={isSaving} 
        />

         <Input 
            type={"text"}
            label={"Email"} 
            // placeholder={"** ** ** **"} 
            // value={name} 
            // onChange={(e) => setCardNumber(e.target.value)}
            // isSaving={isSaving}
            // disabled={isSaving} 
        />
         <Input 
            type={"text"}
            label={"Message"} 
            // placeholder={"** ** ** **"} 
            // value={name} 
            // onChange={(e) => setCardNumber(e.target.value)}
            // isSaving={isSaving}
            // disabled={isSaving} 
        />

        {/* <button type="submit">Send</button> */}
        <ButtonPrimary type="submit" title="Send" />

    </form>
    )
}


export default ContactForm;