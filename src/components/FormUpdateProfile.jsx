import React from 'react';

import {
  Form,
  Formik,
} from 'formik';
import { Loader2 } from 'lucide-react';
import * as Yup from 'yup';

export const updateProfileFields = [
	{
		label: "Họ",
		name: "firstName",
		type: "text",
		placeholder: "Họ",
	},
	{
		label: "Tên",
		name: "lastName",
		type: "text",
		placeholder: "Tên",
	},

	{
		label: "Tên hiển thị",
		name: "displayName",
		type: "text",
		placeholder: "Tên hiển thị",
	},
	

	{
		label: "Địa chỉ email",
		name: "email",
		type: "text",
		placeholder: "Email",
	},
	{
		label: "Số điện thoại",
		name: "phone",
		type: "text",
		placeholder: "Số điện thoại",
	},
	{
		label: "Tỉnh/Thành phố",
		name: "city",
		type: "select",
		options: [], // Sẽ cập nhật sau bằng API hoặc dữ liệu tỉnh thành
		placeholder: " Nhập tỉnh/tp",
	},
	{
		label: "Quận/Huyện",
		name: "district",
		type: "select",
		options: [],
		placeholder: "Nhập Quận/Huyện",
	},
	{
		label: "Xã/Phường/Thị trấn",
		name: "ward",
		type: "select",
		options: [],
		placeholder: "Nhập Xã/Phường/Thị trấn",
	},
	{
		label: "Địa chỉ giao hàng",
		name: "shippingAddress",
		type: "text",
		placeholder: "Nhập địa chỉ cụ thể",
	},
]

export default function FormUpdateProfile() {
	const validationSchema = Yup.object({
		email: Yup.string().email("Email không đúng định dạng").required("Email là bắt buộc"),
		firstName: Yup.string().required("Họ là bắt buộc"),
		lastName: Yup.string().required("Họ là bắt buộc"),
		phone: Yup.string()
			.required("Số điện thoại là bắt buộc")
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Số điện thoại không đúng định dạng")
			.max(10),
		address: Yup.string().required("Địa chỉ là bắt buộc"),
	});
	
	return (
		<Formik
			initialValues={{
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				address: "",
			}}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ handleChange, handleBlur, values, errors, isSubmitting }) => (
				<Form noValidate autoComplete="off" className='flex-1'>
					{updateProfileFields.map((field) => {
						return (
							<div key={field.name} className="mt-3">
								<label
									className="block mb-2 text-sm font-medium text-[#674188]"
									htmlFor={field.name}
								>
									{field.label}
								</label>
								<input
									className="bg-gray-50 border border-gray-300 text-[#674188] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:text-gray-400"
									name={field.name}
									placeholder={field.placeholder}
									aria-label={field.name}
									onChange={handleChange}
									value={values[`${field.name}`] ?? ""}
									onBlur={handleBlur}
									type={field.type}
									id={field.name}
								/>
								<span className="text-xs h-3 block text-red-500 mt-2">
									{errors[field.name] ?? ""}
								</span>
							</div>
						);
					})}

					<button
						type="submit"
						className="w-1/4 min-w-[200px] max-w-[30%] bg-green-600 hover:bg-green-700 mt-5 text-white font-medium rounded-lg text-base px-5 py-2.5 text-center"
						disabled={isSubmitting} // Disable submit button until fully hydrated
					>
						{isSubmitting ? (
							<div className="flex gap-4">
								<Loader2 className="animate-spin" />
								Vui lòng chờ...
							</div>
						) : (
							"Cập nhật"
						)}
					</button>
				</Form>
			)}
		</Formik>
	);
}
