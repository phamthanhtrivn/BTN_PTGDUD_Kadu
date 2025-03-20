import React from 'react';

import {
  Field,
  Form,
  Formik,
} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
	currentPassword: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Mật khẩu hiện tại là bắt buộc"),
	newPassword: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.notOneOf([Yup.ref("currentPassword")], "Mật khẩu mới không được trùng với mật khẩu hiện tại")
		.required("Mật khẩu mới là bắt buộc"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "Mật khẩu không khớp")
		.required("Xác nhận mật khẩu là bắt buộc"),
});

export function FormPassword() {
	return (
		<Formik
			initialValues={{
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			}}
			validationSchema={validationSchema}
		>
			{({ errors, touched }) => (
				<Form className="space-y-6 flex-1">
					<div className="space-y-2">
						<label htmlFor="currentPassword">Mật khẩu hiện tại</label>
						<Field
							id="currentPassword"
							name="currentPassword"
							type="password"
							className={`
								${
									errors.currentPassword && touched.currentPassword ? "border-destructive" : ""
								} bg-gray-50 border border-gray-300 text-[#674188] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:text-gray-400
							`}
						/>
						{errors.currentPassword && touched.currentPassword && (
							<p className="text-sm text-destructive">{errors.currentPassword}</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="newPassword">Mật khẩu mới</label>
						<Field
							id="newPassword"
							name="newPassword"
							type="password"
							className={`
								${
									errors.newPassword && touched.newPassword ? "border-destructive" : ""
								} bg-gray-50 border border-gray-300 text-[#674188] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:text-gray-400
							`}
						/>
						{errors.newPassword && touched.newPassword && (
							<p className="text-sm text-destructive">{errors.newPassword}</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="confirmPassword">Nhập lại mật khẩu mới</label>
						<Field
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							className={`
								${
									errors.confirmPassword && touched.confirmPassword ? "border-destructive" : ""
								} bg-gray-50 border border-gray-300 text-[#674188] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:text-gray-400
							`}
						/>
						{errors.confirmPassword && touched.confirmPassword && (
							<p className="text-sm text-destructive">{errors.confirmPassword}</p>
						)}
					</div>

					<button type="submit" className="w-1/4 min-w-[200px] max-w-[30%] bg-green-600 hover:bg-green-700 mt-5 text-white font-medium rounded-lg text-base px-5 py-2.5 text-center">SAVE CHANGES</button>
				</Form>
			)}
		</Formik>
	);
}
