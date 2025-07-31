// src/components/form/GeneralInfoSection.tsx
import React from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import RadioGroup from "../common/RadioGroup";
import type { OrderFormState, InputChangeEvent } from "../../types";

interface GeneralInfoSectionProps {
  formData: OrderFormState;
  handleChange: (e: InputChangeEvent) => void;
}

const orderTypeOptions = [
  { value: "frozen", label: "แข่งขัน ทีม" },
  { value: "chilled", label: "แข่งขัน บุคคล" },
  { value: "notChilled", label: "ไม่แข่งขัน" },
];

const classLevelOptions = [
  { value: "", label: "-- เลือก --" },
  { value: "ปวช.1", label: "ปวช.1" },
  { value: "ปวช.2", label: "ปวช.2" },
  { value: "ปวช.3", label: "ปวช.3" },
  { value: "ปวส.1", label: "ปวส.1" },
  { value: "ปวส.2", label: "ปวส.2" },
  // Add more as needed
];

import { departments } from '../../data/department-data';

const departmentOptions = [
  { value: '', label: '-- เลือก --' },
  ...departments.map(dept => ({ value: dept, label: dept }))
];

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="grid gap-x-6 gap-y-2 mb-6">
      <div className="flex items-center space-x-4">
        <RadioGroup
          label="ประเภท"
          name="type"
          selectedValue={formData.type}
          options={orderTypeOptions}
          onChange={handleChange}
          className="mb-0"
        />
        <div className="flex space-x-4">
          <InputField
            label="Book"
            name="bookNo"
            value={formData.bookNo}
            onChange={handleChange}
            className="flex-1 mb-0"
            inputClassName="max-w-[150px] p-2 border rounded-md"
          />
          <InputField
            label="No."
            name="orderNo"
            value={formData.orderNo}
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
          value={formData.classLevel}
          options={classLevelOptions}
          onChange={handleChange}
          className="mb-0"
        />
        <InputField
          label="ห้อง"
          name="room"
          value={formData.room}
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
          value={formData.phoneNumber}
          onChange={handleChange}
          type="tel"
          placeholder="e.g., 0812345678"
        />

        <InputField
          label="ครูที่ปรึกษา"
          name="advisorTeacher"
          value={formData.advisorTeacher}
          onChange={handleChange}
        />
        <InputField
          label="วันที่รับเค้ก"
          name="saleDate"
          value={formData.saleDate}
          onChange={handleChange}
          type="date"
          className="mb-0"
        />
      </div>
    </div>
  );
};

export default GeneralInfoSection;
