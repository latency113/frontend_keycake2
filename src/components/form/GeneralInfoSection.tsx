// src/components/form/GeneralInfoSection.tsx
import React from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import RadioGroup from "../common/RadioGroup";
import type { OrderFormState, InputChangeEvent } from "../../types";

interface GeneralInfoSectionProps {
  formData: OrderFormState;
  handleChange: (e: InputChangeEvent) => void;
  branches: { id: string; name: string }[];
  years: { id: string; level:string; year: number }[];
  rooms: { id: string; name:string}[]
}

const orderTypeOptions = [
  { value: "frozen", label: "แข่งขัน ทีม" },
  { value: "chilled", label: "แข่งขัน บุคคล" },
  { value: "notChilled", label: "ไม่แข่งขัน" },
];

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  formData,
  handleChange,
  branches,
  years,
  rooms,
}) => {
  const departmentOptions = [
    { value: "", label: "-- เลือก --" },
    ...branches.map(branch => ({ value: branch.id, label: branch.name }))
  ];

  const roomOptions = [
    { value: "", label: "-- เลือก --" },
    ...rooms.map(room => ({ value: room.id, label: room.name }))
  ];

  const classLevelOptions = [
    { value: "", label: "-- เลือก --" },
    ...years.map(year => ({ value: year.id, label: String(year.year), level: year.level }))
  ];

  return (
    <div className="grid gap-x-6 gap-y-2 mb-6">
      <div className="flex items-center space-x-4">
        <RadioGroup
          label="ประเภท"
          name="type"
          selectedValue={formData.team_id ?? ""}
          options={orderTypeOptions}
          onChange={handleChange}
          className="mb-0"
        />
        <div className="flex space-x-4">
          <InputField
            label="Book"
            name="bookNo"
            value={formData.book_number}
            onChange={handleChange}
            className="flex-1 mb-0"
            inputClassName="max-w-[150px] p-2 border rounded-md"
          />
          <InputField
            label="No."
            name="orderNo"
            value={formData.number}
            onChange={handleChange}
            className="flex-1 mb-0"
            inputClassName="max-w-[150px] p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <InputField
          label="ชื่อผู้แข่งขัน/ชื่อทีม"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />
        <InputField
          label="ชื่อ"
          name="fName"
          value={formData.fName}
          onChange={handleChange}
          className="mb-0"
        />
        <InputField
          label="นามสกุล"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-0"
        />
        <SelectField
          label="ระดับชั้น"
          name="classLevel"
          value={formData.gradelevel}
          options={classLevelOptions}
          onChange={handleChange}
          className="mb-0"
        />
        <SelectField
          label="ห้อง"
          name="room"
          value={formData.room_id || ''}
          options={roomOptions}
          onChange={handleChange}
          className="mb-0"
        />
        <SelectField
          label="แผนก"
          name="department"
          value={formData.department || ''}
          options={departmentOptions}
          onChange={handleChange}
          className="mb-0"
        />
        <InputField
          label="เบอร์โทรศัพท์"
          name="phoneNumber"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="e.g., 0812345678"
        />

        <InputField
          label="ครูที่ปรึกษา"
          name="advisorTeacher"
          value={formData.advisor}
          onChange={handleChange}
        />
        <InputField
          label="วันที่รับเค้ก"
          name="saleDate"
          value={formData.pickup_date}
          onChange={handleChange}
          type="date"
          className="mb-0"
        />
      </div>
    </div>
  );
};

export default GeneralInfoSection;
