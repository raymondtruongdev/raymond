// Nội dung CV. Sửa ở đây, trang chủ tự cập nhật.
export const experiences = [
	{
		role: 'Freelancer',
		time: '2025 - Hiện tại',
		groups: [
			{
				items: [
					'Phát triển ứng dụng cho thiết bị Android Open Source Project (AOSP).',
					'Phát triển các dự án cá nhân đa nền tảng: Android, WearOS, iOS.',
					'Thiết kế Robot Arm kết hợp AI cho các tác vụ tự động hóa công nghiệp và gia dụng.',
					'Xây dựng hệ thống RTOS đa thiết bị với cấu trúc base code đồng nhất.',
				],
			},
		],
	},
	{
		role: 'Software Engineer @ Mijo Vietnam',
		time: '2023 - 2025',
		groups: [
			{
				items: [
					'Phát triển hệ sinh thái ứng dụng cho thiết bị IoT: Watchface, Launcher, Chatbot, Weather, Calendar, Navigation.',
					'Porting OpenGL + Kotlin để tối ưu hóa hiệu suất render Watchface for AOSP.',
					'Phát triển SDK đồ họa cho các thiết bị RTOS sử dụng thư viện LVGL.',
				],
			},
		],
	},
	{
		role: 'Senior AI Engineer @ Fossil Vietnam',
		time: '2018 - 2023',
		groups: [
			{
				items: [
					'Nghiên cứu và cải tiến tối ưu thuật toán đếm bước chân (Pedometer), giúp giảm thiểu sai số và tăng độ chính xác khi theo dõi hoạt động hàng ngày.',
					'Cải tiến thuật toán Sleep Tracking, phân biệt trạng thái nghỉ ngơi và ngủ thật sự.',
					'Phát triển thuật toán nhận diện hoạt động thể chất (Activity Recognition) để phân loại đi bộ, chạy, đạp xe, rowing, elliptical, sau đó đếm reps cho các hoạt động có tính lặp lại.',
					'Phát triển thuật toán Machine Learning dùng cảm biến trên đồng hồ thông minh để phân tích thành phần cơ thể (Body Composition).',
					'Thiết lập protocol, thực nghiệm kiểm định (Validation) hiệu năng đo Heart Rate và SpO2 trên thiết bị đeo. Phối hợp cùng third-party vendors cải tiến thuật toán Heart Rate, SpO2.',
				],
			},
		],
	},
	{
		role: 'Lecturer @ HCMUT',
		time: '2012 - 2018',
		groups: [
			{
				title: 'Giảng dạy',
				items: [
					'Giảng dạy các môn Microcontroller, PLC, Automation systems, AC Servo control, Industrial Robotics.',
					'Soạn bài giảng và bài thực hành kết hợp lý thuyết với thực hành, giúp sinh viên nắm vững kiến thức và kỹ năng thực tế.',
				],
			},
			{
				title: 'Chuyển giao công nghệ',
				items: [
					'Hệ thống quản lý đơn hàng dựa trên Barcode: sản phẩm trên băng tải được PC, PLC, Servo motor, xylanh khí nén điều khiển để tự động phân loại vào các khay theo đơn hàng.',
					'Hệ thống kiểm tra, đo áp lực gối cao su thành phẩm và lưu vào cơ sở dữ liệu bằng PLC + Visual Studio application.',
				],
			},
		],
	},
	{
		role: 'Researcher Engineer @ Hitech Lab (HCMUT)',
		time: '2010 - 2012',
		groups: [
			{
				items: [
					'Thiết kế chế tạo robot hàn tự động tracking cho các mối hàn thẳng trên mặt phẳng và trên các vách trần.',
					'Thiết kế và lập trình hệ thống tự động hóa thông minh để kiểm soát nhiệt độ, độ ẩm và tưới cây trong nhà kính.',
				],
			},
		],
	},
];

export const skills = [
	'AOSP / Android',
	'Machine Learning',
	'RTOS / LVGL',
	'Matlab',
	'C++',
	'Python',
	'PLC',
	'SolidWorks',
];

export const education = [
	{ degree: 'Master - Mechatronics (Excellent)', time: '2012 - 2014' },
	{ degree: 'Engineer - Mechanical Engineering (Good)', time: '2005 - 2010' },
];

export const languages = [
	{ name: 'Tiếng Việt', level: 'Bản ngữ' },
	{ name: 'Tiếng Anh', level: 'TOEIC' },
];
