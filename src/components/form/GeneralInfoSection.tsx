import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import RadioGroup from "../common/RadioGroup";
import type {
  OrderFormState,
  InputChangeEvent,
  branches,
  years,
  rooms,
} from "../../types";

interface GeneralInfoSectionProps {
  formData: OrderFormState;
  handleChange: (e: InputChangeEvent) => void;
  branches: branches[];
  years: years[];
  rooms: rooms[];
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
  const [filteredYears, setFilteredYears] = useState<years[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<rooms[]>([]);

  // แก้ไขใหม่: กรองปีตามแผนก
  useEffect(() => {
    if (formData.branch_id) {
      const branchYears = years.filter((year) =>
        year.rooms?.some((room) => room.branch_id == formData.branch_id)
      );
      setFilteredYears(branchYears);
    } else {
      setFilteredYears([]);
    }
  }, [formData.branch_id, years]);

  // แก้ไขใหม่: กรองห้องตามชั้นปี
  useEffect(() => {
    if (formData.year_id) {
      const selectedYear = years.find((year) => year.id === formData.year_id);
      const filtered =
        selectedYear?.rooms?.filter(
          (room) => room.branch_id == formData.branch_id
        ) ?? [];
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]);
    }
  }, [formData.year_id, formData.branch_id, years]);

  const departmentOptions = [
    { value: "", label: "-- เลือก --" },
    ...(branches || []).map((branch) => ({
      value: branch.id,
      label: branch.name,
    })),
  ];

  const roomOptions = [
    { value: "", label: "-- เลือก --" },
    ...(filteredRooms || []).map((room) => ({
      value: room.id,
      label: room.name,
    })),
  ];

  const classLevelOptions = [
    { value: "", label: "-- เลือก --" },
    ...(filteredYears || []).map((year) => ({
      value: year.id,
      label: `${year.level === "VOCATIONAL" ? "ปวช" : "ปวส"} ${year.year}`,
    })),
  ];

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    formData.year_id = "";
    formData.room_id = "";
    setFilteredYears([]);
    setFilteredRooms([]);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    formData.room_id = "";
    setFilteredRooms([]);
  };

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
            name="book_number"
            value={formData.book_number}
            onChange={handleChange}
            className="flex-1 mb-0"
            inputClassName="max-w-[150px] p-2 border rounded-md"
          />
          <InputField
            label="No."
            name="number"
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
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          className="mb-0"
        />
        <InputField
          label="นามสกุล"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="mb-0"
        />

        <SelectField
          label="แผนก"
          name="branch_id"
          value={formData.branch_id || ""}
          options={departmentOptions}
          onChange={handleBranchChange}
        />

        <SelectField
          label="ระดับชั้น"
          name="year_id"
          value={formData.year_id || ""}
          options={classLevelOptions}
          onChange={handleYearChange}
          disabled={!formData.branch_id}
        />

        <SelectField
          label="ห้อง"
          name="room_id"
          value={formData.room_id || ""}
          options={roomOptions}
          onChange={handleChange}
          disabled={!formData.year_id}
        />

        <InputField
          label="เบอร์โทรศัพท์"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="e.g., 0812345678"
        />

        <InputField
          label="ครูที่ปรึกษา"
          name="advisor"
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
