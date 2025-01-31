import Input from "./Input";
import InputSelect from "./InputSelect";
import InputTextarea from "./InputTextarea";
import Link from "next/link";
import Edit from "../components/icons/Edit";
import { usePathname } from "next/navigation";

function AddressInputs({
  addressProps,
  setAddressProps,
  isSaving,
  validatePhone,
  validatePostalCode,
  isEditable,
}) {
  const {
    phone,
    streetAddress,
    postalCode,
    country,
    countriesWithCities,
    city,
    cityOptions,
  } = addressProps;

  const path = usePathname();

  return (
    <>
      <h1 className="font-bold">Address</h1>

      {path === "/cart" && (
        <Link href="/profile" className="flex items-center justify-end my-4">
          <div className="hover:text-gray-700">
            <Edit />
          </div>
        </Link>
      )}

      <Input
        type={"text"}
        label={"Phone Number"}
        placeholder={"Phone Number"}
        value={phone}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        isSaving={isSaving}
        isEditable={isEditable}
      />

      <Input
        type={"text"}
        label={"Postal Code"}
        placeholder={"Postal Code"}
        value={postalCode}
        onChange={(e) => setAddressProps("postalCode", e.target.value)}
        isSaving={isSaving}
        isEditable={isEditable}
      />

      <InputTextarea
        type={"text"}
        label={"Street Address"}
        placeholder={"Street..."}
        value={streetAddress}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
        isSaving={isSaving}
        isEditable={isEditable}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputSelect
            label={"Country"}
            value={country}
            onChange={(e) => setAddressProps("country", e.target.value)}
            optionLabel={"Select a country"}
            optionItems={countriesWithCities}
            isSaving={isSaving}
            isEditable={isEditable}
          />
        </div>

        <div>
          <InputSelect
            label={"City"}
            value={city}
            onChange={(e) => setAddressProps("city", e.target.value)}
            optionLabel={"Select a city"}
            optionItems={cityOptions}
            isSaving={isSaving}
            isEditable={isEditable}
          />
        </div>
      </div>
    </>
  );
}

export default AddressInputs;
