// Nội dung CV. Sửa ở đây, trang chủ tự cập nhật.
export const email = 'quoctoan2202@gmail.com';
export const github = 'https://github.com/raymondtruongdev';
export const location = 'TP. Hồ Chí Minh';
// Link Google Drive, nhớ bật chia sẻ "Anyone with the link"
export const cvUrl = 'https://drive.google.com/file/d/1dxLly0TYVkqtq67Qh_lq0EdsLtcNndVz/view?usp=sharing';

export const stats = [
	{ value: '16', plus: true, unit: 'năm', label: 'kinh nghiệm' },
	{ value: '8', unit: 'năm', label: 'AOSP & Embedded systems' },
	{ value: '5', unit: 'năm', label: 'AI wearable @ Fossil' },
	{ value: '6', unit: 'năm', label: 'Teaching @ HCMUT' },
	{ value: 'Thạc sĩ', label: 'Cơ điện tử' },
];

export const expertise = [
	{
		icon: 'brain',
		key: 'AI',
		title: 'AI / Machine Learning',
		text: 'Thuật toán cho thiết bị đeo: nhận diện hoạt động, Sleep Tracking, Body Composition.',
	},
	{ icon: 'chip', key: 'RTOS', title: 'Embedded / RTOS', text: 'Hệ thống RTOS đa thiết bị và SDK đồ họa với thư viện LVGL.' },
	{
		icon: 'phone',
		key: 'AOSP',
		title: 'Android / AOSP',
		text: 'Ứng dụng cho AOSP, Android, WearOS, iOS: Watchface, Launcher, Chatbot.',
	},
	{ icon: 'bot', key: 'PLC', title: 'Tự động hóa & Robotics', text: 'Robot Arm kết hợp AI, robot hàn tự động, hệ thống PLC và Servo.' },
];

export interface Experience {
	role: string;
	company: string;
	period: string;
	// Ba ý luôn hiện; `more` hiện khi bấm "Xem thêm"
	points: string[];
	more?: string[];
	tags: string[];
}

export const experiences: Experience[] = [
	{
		role: 'Senior Firmware Engineer',
		company: 'T2DTECH',
		period: '2025 – Hiện tại',
		points: [
			'Firmware cho gateway giám sát trung tâm trên Zephyr RTOS, cập nhật OTA',
			'Thu dữ liệu từ các thiết bị BLE beacon và gửi lên AWS qua Wi-Fi',
			'Giao diện web truyền dữ liệu thời gian thực và truyền file qua Web BLE, UART',
		],
		more: [
			'Robot Arm 6 bậc tự do in 3D: viết chữ, phân loại vật, tự chơi cờ',
			'Tham gia xây dựng lớp trừu tượng firmware RTOS đa nền tảng (STM32, Apollo3, BES)',
		],
		tags: ['Zephyr RTOS', 'BLE', 'AWS', 'Robotics'],
	},
	{
		role: 'Senior Software Engineer',
		company: 'Mijo Vietnam',
		period: '2023 – 2025',
		points: [
			'Hệ sinh thái ứng dụng IoT: Watchface, Launcher, Chatbot, Weather, Calendar, Navigation',
			'Tham gia porting OpenGL + Kotlin tối ưu render Watchface cho AOSP',
			'Tham gia phát triển SDK đồ họa cho thiết bị RTOS dùng LVGL',
		],
		tags: ['Kotlin', 'OpenGL', 'AOSP', 'LVGL'],
	},
	{
		role: 'Staff AI Algorithm Engineer',
		company: 'Fossil Vietnam',
		period: '2018 – 2023',
		points: [
			'Dẫn dắt nhóm nghiên cứu thuật toán cảm biến cho smartwatch, hướng dẫn thành viên và thực tập sinh',
			'Nhận diện hoạt động trên thiết bị: đi bộ, chạy, đạp xe, rowing, elliptical',
			'Cải tiến Sleep Tracking: số phiên thức nằm yên bị nhận nhầm giảm từ khoảng 300 xuống 100 trên 10.000',
		],
		more: [
			'Double-Tap Wake-Up: giảm khoảng 80% số lần kích hoạt nhầm',
			'Đếm bước: hướng dẫn nhóm giảm hơn 90% bước đếm sai khi rung mạnh (xe máy, xe buýt)',
			'Nhận biết đang đeo hay đã tháo đồng hồ, đếm số tầng đã leo',
			'Protocol kiểm định Heart Rate, SpO2 và đánh giá giải pháp của các vendor',
		],
		tags: ['Machine Learning', 'Signal Processing', 'Sensors'],
	},
	{
		role: 'Lecturer',
		company: 'ĐH Bách Khoa TP.HCM',
		period: '2016 – 2018',
		points: [
			'Giảng dạy PLC, vi điều khiển, robot công nghiệp',
			'Máy kiểm tra độ êm gối cao su cho Kymdan: PLC, C#, SQL, RS-485',
			'Hệ thống phân loại dược phẩm tự động cho DHG Pharma: băng tải, barcode, PLC',
		],
		tags: ['PLC', 'Microcontroller', 'C#', 'SQL'],
	},
	{
		role: 'Research Scholar',
		company: 'NTU Singapore',
		period: '2014 – 2016',
		points: [
			'Nghiên cứu tái tạo 3D cơ thể người từ một camera smartphone',
			'Trích đặc trưng, ước lượng vị trí camera, Structure-from-Motion',
			'Trợ giảng phòng thí nghiệm Vật lý đại cương',
		],
		tags: ['Computer Vision', '3D Reconstruction'],
	},
	{
		role: 'Lecturer',
		company: 'ĐH Bách Khoa TP.HCM',
		period: '2010 – 2014',
		points: [
			'Giảng dạy tự động hóa sản xuất, trợ giảng Động lực học hệ thống',
			'Robot di động làm vệ sinh ống gió',
			'Hệ thống tự động tưới và điều khiển khí hậu cho nhà kính tại Đà Lạt',
		],
		more: ['Hướng dẫn đồ án sinh viên về tự động hóa sản xuất'],
		tags: ['Robotics', 'Control', 'Automation'],
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
	{ degree: 'Thạc sĩ Cơ điện tử', grade: 'Xuất sắc', period: '2012 – 2013' },
	{ degree: 'Kỹ sư Cơ khí', grade: 'Khá', period: '2005 – 2010' },
];

export const languages = [
	{ name: 'Tiếng Việt', level: 'Bản ngữ' },
	{ name: 'Tiếng Anh', level: 'Thành thạo' },
];
