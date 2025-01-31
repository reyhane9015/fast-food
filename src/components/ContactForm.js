import Input from "@/components/ui/Input";
import ButtonPrimary from "@/components/ui/ButtonPrimary";

function ContactForm() {
  return (
    <form className="bg-light-SBackground dark:bg-dark-SBackground p-8">
      <Input type={"text"} label={"Name"} />

      <Input type={"text"} label={"Email"} />
      <Input type={"text"} label={"Message"} />

      <ButtonPrimary type="submit" title="Send" />
    </form>
  );
}

export default ContactForm;
