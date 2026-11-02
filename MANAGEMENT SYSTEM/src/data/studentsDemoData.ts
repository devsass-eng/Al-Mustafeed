import type { Student } from '../types/student';

export const STUDENTS_PER_CLASS = 55;

// 330 students across 6 classes, ~55 each
// Using realistic Islamic names throughout

const makeStudent = (
  id: string,
  code: string,
  name: string,
  guardianName: string,
  guardianPhone: string,
  assignedClass: string,
  teacherId: string,
  teacherName: string,
  enrollmentDate: string,
  accountCreationDate: string,
  attendanceRate: number,
  status: 'active' | 'suspended' = 'active'
): Student => ({
  id,
  studentCode: code,
  name,
  guardianName,
  guardianPhone,
  assignedClass,
  assignedTeacherId: teacherId,
  assignedTeacherName: teacherName,
  enrollmentDate,
  accountCreationDate,
  attendanceRate,
  status,
  gender: 'male',
});

// ── CLASS HIFZ-1 (55 students) — Teacher: Qari Abdul Rahman Al-Sudani (tch-001) ──
const hifz1Students: Student[] = [
  makeStudent('s-101','AM-2026-001','Zayd Ibn Thabit','Thabit Ibn Qays','+234 803 001 0001','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','10 Jan 2024','15 Jan 2024, 08:30 AM',98),
  makeStudent('s-102','AM-2026-002','Abdullah Ibn Abbas','Abbas Ibn Abd Al-Muttalib','+234 803 001 0002','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','10 Jan 2024','15 Jan 2024, 08:35 AM',96),
  makeStudent('s-103','AM-2026-003','Usamah Ibn Zayd','Zayd Ibn Harithah','+234 803 001 0003','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','10 Jan 2024','15 Jan 2024, 08:40 AM',94),
  makeStudent('s-104','AM-2026-004','Ubayy Ibn Kab','Kab Ibn Amr','+234 803 001 0004','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','10 Jan 2024','15 Jan 2024, 08:45 AM',100),
  makeStudent('s-105','AM-2026-005','Muadh Ibn Jabal','Jabal Al-Ansari','+234 803 001 0005','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','10 Jan 2024','15 Jan 2024, 08:50 AM',97),
  makeStudent('s-106','AM-2026-006','Anas Ibn Malik','Malik Ibn Al-Nadr','+234 803 001 0006','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','10 Jan 2024','15 Jan 2024, 08:55 AM',95),
  makeStudent('s-107','AM-2026-007','Salman Al-Farisi','Al-Farisi Abdullahi','+234 803 001 0007','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Jan 2024','17 Jan 2024, 09:00 AM',92),
  makeStudent('s-108','AM-2026-008','Ammar Ibn Yasir','Yasir Al-Ansi','+234 803 001 0008','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Jan 2024','17 Jan 2024, 09:05 AM',99),
  makeStudent('s-109','AM-2026-009','Khabbab Ibn Al-Aratt','Al-Aratt Khalil','+234 803 001 0009','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Jan 2024','17 Jan 2024, 09:10 AM',93),
  makeStudent('s-110','AM-2026-010','Suhayb Al-Rumi','Al-Rumi Hassan','+234 803 001 0010','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Jan 2024','17 Jan 2024, 09:15 AM',91),
  makeStudent('s-111','AM-2026-011','Miqdad Ibn Amr','Amr Ibn Thalabah','+234 803 001 0011','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Jan 2024','20 Jan 2024, 09:20 AM',96),
  makeStudent('s-112','AM-2026-012','Said Ibn Zayd','Zayd Al-Adawi','+234 803 001 0012','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Jan 2024','20 Jan 2024, 09:25 AM',98),
  makeStudent('s-113','AM-2026-013','Talhah Ibn Ubaydullah','Ubaydullah Al-Taymi','+234 803 001 0013','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Jan 2024','20 Jan 2024, 09:30 AM',95),
  makeStudent('s-114','AM-2026-014','Zubayr Ibn Al-Awwam','Al-Awwam Al-Qurashi','+234 803 001 0014','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Jan 2024','20 Jan 2024, 09:35 AM',97),
  makeStudent('s-115','AM-2026-015','Abd Al-Rahman Ibn Awf','Awf Ibn Abd Al-Harith','+234 803 001 0015','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','17 Jan 2024','22 Jan 2024, 09:40 AM',100),
  makeStudent('s-116','AM-2026-016','Abu Ubaydah Amir','Amir Ibn Abdullah','+234 803 001 0016','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','17 Jan 2024','22 Jan 2024, 09:45 AM',88),
  makeStudent('s-117','AM-2026-017','Hudhayfah Ibn Al-Yaman','Al-Yaman Al-Absi','+234 803 001 0017','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','17 Jan 2024','22 Jan 2024, 09:50 AM',93),
  makeStudent('s-118','AM-2026-018','Sad Ibn Abi Waqqas','Abi Waqqas Al-Zuhri','+234 803 001 0018','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','17 Jan 2024','22 Jan 2024, 09:55 AM',96),
  makeStudent('s-119','AM-2026-019','Uthman Ibn Mazun','Mazun Al-Jumahi','+234 803 001 0019','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','20 Jan 2024','25 Jan 2024, 10:00 AM',90),
  makeStudent('s-120','AM-2026-020','Sad Ibn Muadh','Muadh Ibn Al-Numan','+234 803 001 0020','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','20 Jan 2024','25 Jan 2024, 10:05 AM',94),
  makeStudent('s-121','AM-2026-021','Jafar Ibn Abi Talib','Abi Talib Al-Hashimi','+234 803 001 0021','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','20 Jan 2024','25 Jan 2024, 10:10 AM',97),
  makeStudent('s-122','AM-2026-022','Muawiyah Ibn Abi Sufyan','Abi Sufyan Sakhr','+234 803 001 0022','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','22 Jan 2024','27 Jan 2024, 10:15 AM',89),
  makeStudent('s-123','AM-2026-023','Numan Ibn Bashir','Bashir Ibn Sad','+234 803 001 0023','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','22 Jan 2024','27 Jan 2024, 10:20 AM',95),
  makeStudent('s-124','AM-2026-024','Jabir Ibn Abdullah','Abdullah Ibn Amr','+234 803 001 0024','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','22 Jan 2024','27 Jan 2024, 10:25 AM',92),
  makeStudent('s-125','AM-2026-025','Abu Hurayrah Al-Dawsi','Al-Dawsi Musa','+234 803 001 0025','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','25 Jan 2024','30 Jan 2024, 10:30 AM',99),
  makeStudent('s-126','AM-2026-026','Imran Ibn Husayn','Husayn Ibn Amr','+234 803 001 0026','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','25 Jan 2024','30 Jan 2024, 10:35 AM',96),
  makeStudent('s-127','AM-2026-027','Rafi Ibn Khadij','Khadij Al-Ansari','+234 803 001 0027','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','25 Jan 2024','30 Jan 2024, 10:40 AM',94),
  makeStudent('s-128','AM-2026-028','Zayd Ibn Arqam','Arqam Al-Zuhri','+234 803 001 0028','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','28 Jan 2024','02 Feb 2024, 10:45 AM',93),
  makeStudent('s-129','AM-2026-029','Bara Ibn Azib','Azib Al-Ansari','+234 803 001 0029','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','28 Jan 2024','02 Feb 2024, 10:50 AM',97),
  makeStudent('s-130','AM-2026-030','Wathilah Ibn Al-Asqa','Al-Asqa Al-Laythi','+234 803 001 0030','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','28 Jan 2024','02 Feb 2024, 10:55 AM',91),
  makeStudent('s-131','AM-2026-031','Aws Ibn Al-Samit','Al-Samit Al-Ansari','+234 803 001 0031','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','01 Feb 2024','06 Feb 2024, 11:00 AM',88),
  makeStudent('s-132','AM-2026-032','Thawban Ibn Bajdad','Bajdad Al-Mawla','+234 803 001 0032','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','01 Feb 2024','06 Feb 2024, 11:05 AM',95),
  makeStudent('s-133','AM-2026-033','Khalid Ibn Al-Walid','Al-Walid Al-Makhzumi','+234 803 001 0033','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','01 Feb 2024','06 Feb 2024, 11:10 AM',100),
  makeStudent('s-134','AM-2026-034','Amr Ibn Al-As','Al-As Al-Sahmi','+234 803 001 0034','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','05 Feb 2024','10 Feb 2024, 11:15 AM',96),
  makeStudent('s-135','AM-2026-035','Iyadh Ibn Ghanam','Ghanam Al-Fihri','+234 803 001 0035','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','05 Feb 2024','10 Feb 2024, 11:20 AM',93),
  makeStudent('s-136','AM-2026-036','Mughirah Ibn Shubah','Shubah Al-Thaqafi','+234 803 001 0036','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','05 Feb 2024','10 Feb 2024, 11:25 AM',91),
  makeStudent('s-137','AM-2026-037','Shaddad Ibn Aws','Aws Al-Ansari','+234 803 001 0037','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','08 Feb 2024','13 Feb 2024, 11:30 AM',89),
  makeStudent('s-138','AM-2026-038','Uqbah Ibn Amir','Amir Al-Juhani','+234 803 001 0038','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','08 Feb 2024','13 Feb 2024, 11:35 AM',97),
  makeStudent('s-139','AM-2026-039','Maslamah Ibn Mukhallad','Mukhallad Al-Ansari','+234 803 001 0039','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','08 Feb 2024','13 Feb 2024, 11:40 AM',94),
  makeStudent('s-140','AM-2026-040','Fayruz Al-Daylami','Daylami Harith','+234 803 001 0040','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Feb 2024','17 Feb 2024, 11:45 AM',92),
  makeStudent('s-141','AM-2026-041','Nuaym Ibn Masud','Masud Al-Ashjai','+234 803 001 0041','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Feb 2024','17 Feb 2024, 11:50 AM',95),
  makeStudent('s-142','AM-2026-042','Umar Ibn Al-Khattab Jr','Al-Khattab Hisham','+234 803 001 0042','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','12 Feb 2024','17 Feb 2024, 11:55 AM',98),
  makeStudent('s-143','AM-2026-043','Hasan Ibn Ali Al-Basri','Ali Ibrahim','+234 803 001 0043','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Feb 2024','20 Feb 2024, 12:00 PM',90),
  makeStudent('s-144','AM-2026-044','Sufyan Al-Thawri Jr','Thawri Yusuf','+234 803 001 0044','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Feb 2024','20 Feb 2024, 12:05 PM',87),
  makeStudent('s-145','AM-2026-045','Malik Ibn Dinar Jr','Dinar Ahmad','+234 803 001 0045','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','15 Feb 2024','20 Feb 2024, 12:10 PM',93),
  makeStudent('s-146','AM-2026-046','Uways Al-Qarani Jr','Al-Qarani Bilal','+234 803 001 0046','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','19 Feb 2024','24 Feb 2024, 12:15 PM',96),
  makeStudent('s-147','AM-2026-047','Fudayl Ibn Iyad Jr','Iyad Khalid','+234 803 001 0047','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','19 Feb 2024','24 Feb 2024, 12:20 PM',91),
  makeStudent('s-148','AM-2026-048','Ibrahim Ibn Adham Jr','Adham Salim','+234 803 001 0048','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','19 Feb 2024','24 Feb 2024, 12:25 PM',88),
  makeStudent('s-149','AM-2026-049','Ahmad Ibn Hanbal Jr','Hanbal Mustafa','+234 803 001 0049','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','22 Feb 2024','27 Feb 2024, 12:30 PM',97),
  makeStudent('s-150','AM-2026-050','Nafi Ibn Aslam Jr','Aslam Hamza','+234 803 001 0050','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','22 Feb 2024','27 Feb 2024, 12:35 PM',94),
  makeStudent('s-151','AM-2026-051','Qasim Ibn Muhammad Jr','Muhammad Zayd','+234 803 001 0051','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','22 Feb 2024','27 Feb 2024, 12:40 PM',99),
  makeStudent('s-152','AM-2026-052','Junayd Al-Baghdadi Jr','Al-Baghdadi Tariq','+234 803 001 0052','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','26 Feb 2024','02 Mar 2024, 12:45 PM',92),
  makeStudent('s-153','AM-2026-053','Shibli Al-Nursi Jr','Al-Nursi Ibrahim','+234 803 001 0053','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','26 Feb 2024','02 Mar 2024, 12:50 PM',90),
  makeStudent('s-154','AM-2026-054','Rabi Ibn Anas Jr','Anas Al-Ansari','+234 803 001 0054','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','26 Feb 2024','02 Mar 2024, 12:55 PM',95),
  makeStudent('s-155','AM-2026-055','Yahya Ibn Muadh Jr','Muadh Al-Razi','+234 803 001 0055','Class Hifz-1','tch-001','Qari Abdul Rahman Al-Sudani','01 Mar 2024','06 Mar 2024, 01:00 PM',93,'active'),
];

// ── CLASS HIFZ-2 (55 students) — Teacher: Ustadh Bilal Ahmad (tch-002) ──
const hifz2Students: Student[] = [
  makeStudent('s-201','AM-2026-056','Ibrahim Al-Qasim','Al-Qasim Mansoor','+234 802 002 0001','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Mar 2024','10 Mar 2024, 08:00 AM',96),
  makeStudent('s-202','AM-2026-057','Ahmad Al-Mansoor','Mansoor Al-Farooq','+234 802 002 0002','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Mar 2024','10 Mar 2024, 08:05 AM',94),
  makeStudent('s-203','AM-2026-058','Hasan Al-Basri Jr','Al-Basri Umar','+234 802 002 0003','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Mar 2024','10 Mar 2024, 08:10 AM',99),
  makeStudent('s-204','AM-2026-059','Tariq Ibn Ziyad Jr','Ziyad Al-Amazigh','+234 802 002 0004','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Mar 2024','10 Mar 2024, 08:15 AM',92),
  makeStudent('s-205','AM-2026-060','Musa Al-Kadhim Jr','Al-Kadhim Salim','+234 802 002 0005','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','08 Mar 2024','13 Mar 2024, 08:20 AM',88),
  makeStudent('s-206','AM-2026-061','Idris Al-Awwal','Al-Awwal Kamal','+234 802 002 0006','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','08 Mar 2024','13 Mar 2024, 08:25 AM',95),
  makeStudent('s-207','AM-2026-062','Haroon Al-Rashid Jr','Al-Rashid Faisal','+234 802 002 0007','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','08 Mar 2024','13 Mar 2024, 08:30 AM',91),
  makeStudent('s-208','AM-2026-063','Dawud Al-Tayyi Jr','Al-Tayyi Adnan','+234 802 002 0008','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','12 Mar 2024','17 Mar 2024, 08:35 AM',97),
  makeStudent('s-209','AM-2026-064','Sulayman Ibn Umar','Umar Al-Hashimi','+234 802 002 0009','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','12 Mar 2024','17 Mar 2024, 08:40 AM',93),
  makeStudent('s-210','AM-2026-065','Isa Ibn Maryam Jr','Maryam Khalil','+234 802 002 0010','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','12 Mar 2024','17 Mar 2024, 08:45 AM',90),
  makeStudent('s-211','AM-2026-066','Yahya Al-Barmaki Jr','Al-Barmaki Rashid','+234 802 002 0011','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','15 Mar 2024','20 Mar 2024, 08:50 AM',96),
  makeStudent('s-212','AM-2026-067','Ubayd Al-Khurasani','Al-Khurasani Mus','+234 802 002 0012','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','15 Mar 2024','20 Mar 2024, 08:55 AM',98),
  makeStudent('s-213','AM-2026-068','Fadl Ibn Sahl Jr','Sahl Al-Sarakhsi','+234 802 002 0013','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','15 Mar 2024','20 Mar 2024, 09:00 AM',94),
  makeStudent('s-214','AM-2026-069','Nasr Ibn Sayyar Jr','Sayyar Al-Khurasani','+234 802 002 0014','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','19 Mar 2024','24 Mar 2024, 09:05 AM',87),
  makeStudent('s-215','AM-2026-070','Qutaybah Ibn Muslim Jr','Muslim Al-Bahili','+234 802 002 0015','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','19 Mar 2024','24 Mar 2024, 09:10 AM',92),
  makeStudent('s-216','AM-2026-071','Walid Ibn Uqbah Jr','Uqbah Al-Umawi','+234 802 002 0016','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','19 Mar 2024','24 Mar 2024, 09:15 AM',89),
  makeStudent('s-217','AM-2026-072','Amr Ibn Kulthum Jr','Kulthum Al-Taghlibi','+234 802 002 0017','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','22 Mar 2024','27 Mar 2024, 09:20 AM',95),
  makeStudent('s-218','AM-2026-073','Laith Ibn Sad Jr','Sad Al-Misri','+234 802 002 0018','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','22 Mar 2024','27 Mar 2024, 09:25 AM',97),
  makeStudent('s-219','AM-2026-074','Sufyan Ibn Uyaynah Jr','Uyaynah Al-Hilali','+234 802 002 0019','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','22 Mar 2024','27 Mar 2024, 09:30 AM',91),
  makeStudent('s-220','AM-2026-075','Zubayr Ibn Bakkar Jr','Bakkar Al-Zubayri','+234 802 002 0020','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','26 Mar 2024','31 Mar 2024, 09:35 AM',93),
  makeStudent('s-221','AM-2026-076','Muhammad Ibn Idris Jr','Idris Al-Shafi','+234 802 002 0021','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','26 Mar 2024','31 Mar 2024, 09:40 AM',100),
  makeStudent('s-222','AM-2026-077','Ahmad Ibn Tulun Jr','Tulun Al-Turki','+234 802 002 0022','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','26 Mar 2024','31 Mar 2024, 09:45 AM',88),
  makeStudent('s-223','AM-2026-078','Ali Ibn Abi Talib Jr','Abi Talib Hussain','+234 802 002 0023','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','29 Mar 2024','03 Apr 2024, 09:50 AM',96),
  makeStudent('s-224','AM-2026-079','Umar Ibn Abd Al-Aziz Jr','Abd Al-Aziz Musa','+234 802 002 0024','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','29 Mar 2024','03 Apr 2024, 09:55 AM',94),
  makeStudent('s-225','AM-2026-080','Yazid Ibn Muawiyah Jr','Muawiyah Anas','+234 802 002 0025','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','29 Mar 2024','03 Apr 2024, 10:00 AM',90),
  makeStudent('s-226','AM-2026-081','Marwan Ibn Al-Hakam Jr','Al-Hakam Saleh','+234 802 002 0026','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','02 Apr 2024','07 Apr 2024, 10:05 AM',85),
  makeStudent('s-227','AM-2026-082','Hisham Ibn Abd Al-Malik Jr','Abd Al-Malik Tariq','+234 802 002 0027','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','02 Apr 2024','07 Apr 2024, 10:10 AM',92),
  makeStudent('s-228','AM-2026-083','Mansoor Al-Hallaj Jr','Al-Hallaj Ahmad','+234 802 002 0028','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','02 Apr 2024','07 Apr 2024, 10:15 AM',89),
  makeStudent('s-229','AM-2026-084','Nizam Al-Mulk Jr','Al-Mulk Karim','+234 802 002 0029','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Apr 2024','10 Apr 2024, 10:20 AM',97),
  makeStudent('s-230','AM-2026-085','Ghazali Al-Tusi Jr','Al-Tusi Rashid','+234 802 002 0030','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Apr 2024','10 Apr 2024, 10:25 AM',95),
  makeStudent('s-231','AM-2026-086','Ibn Rushd Al-Qurtubi Jr','Al-Qurtubi Bilal','+234 802 002 0031','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','05 Apr 2024','10 Apr 2024, 10:30 AM',91),
  makeStudent('s-232','AM-2026-087','Ibn Khaldun Al-Tunisi Jr','Al-Tunisi Walid','+234 802 002 0032','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','09 Apr 2024','14 Apr 2024, 10:35 AM',98),
  makeStudent('s-233','AM-2026-088','Ibn Battuta Jr','Battuta Al-Tanji','+234 802 002 0033','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','09 Apr 2024','14 Apr 2024, 10:40 AM',93),
  makeStudent('s-234','AM-2026-089','Ibn Sina Al-Bukhari Jr','Al-Bukhari Hamdan','+234 802 002 0034','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','09 Apr 2024','14 Apr 2024, 10:45 AM',87),
  makeStudent('s-235','AM-2026-090','Ibn Al-Haytham Jr','Al-Haytham Saad','+234 802 002 0035','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','12 Apr 2024','17 Apr 2024, 10:50 AM',94),
  makeStudent('s-236','AM-2026-091','Jabir Ibn Hayyan Jr','Hayyan Al-Azdi','+234 802 002 0036','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','12 Apr 2024','17 Apr 2024, 10:55 AM',90),
  makeStudent('s-237','AM-2026-092','Al-Kindi Al-Basri Jr','Al-Basri Mansur','+234 802 002 0037','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','12 Apr 2024','17 Apr 2024, 11:00 AM',96),
  makeStudent('s-238','AM-2026-093','Al-Farabi Al-Kindi Jr','Al-Kindi Yaqub','+234 802 002 0038','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','16 Apr 2024','21 Apr 2024, 11:05 AM',88),
  makeStudent('s-239','AM-2026-094','Al-Biruni Al-Khwarizmi Jr','Al-Khwarizmi Zayd','+234 802 002 0039','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','16 Apr 2024','21 Apr 2024, 11:10 AM',95),
  makeStudent('s-240','AM-2026-095','Al-Masudi Al-Baghdadi Jr','Al-Baghdadi Anas','+234 802 002 0040','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','16 Apr 2024','21 Apr 2024, 11:15 AM',92),
  makeStudent('s-241','AM-2026-096','Al-Tabari Al-Amuli Jr','Al-Amuli Suleiman','+234 802 002 0041','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','19 Apr 2024','24 Apr 2024, 11:20 AM',99),
  makeStudent('s-242','AM-2026-097','Al-Bukhari Al-Jufi Jr','Al-Jufi Nasser','+234 802 002 0042','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','19 Apr 2024','24 Apr 2024, 11:25 AM',97),
  makeStudent('s-243','AM-2026-098','Muslim Al-Nisaburi Jr','Al-Nisaburi Khalid','+234 802 002 0043','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','19 Apr 2024','24 Apr 2024, 11:30 AM',91),
  makeStudent('s-244','AM-2026-099','Abu Dawud Al-Azdi Jr','Al-Azdi Musa','+234 802 002 0044','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','23 Apr 2024','28 Apr 2024, 11:35 AM',86),
  makeStudent('s-245','AM-2026-100','Al-Tirmidhi Al-Bugh Jr','Al-Bugh Hamza','+234 802 002 0045','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','23 Apr 2024','28 Apr 2024, 11:40 AM',93),
  makeStudent('s-246','AM-2026-101','Al-Nasai Al-Khurasani Jr','Al-Khurasani Ahmad','+234 802 002 0046','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','23 Apr 2024','28 Apr 2024, 11:45 AM',90),
  makeStudent('s-247','AM-2026-102','Ibn Majah Al-Qazwini Jr','Al-Qazwini Ibrahim','+234 802 002 0047','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','26 Apr 2024','01 May 2024, 11:50 AM',96),
  makeStudent('s-248','AM-2026-103','Shafi Ibn Idris Jr','Idris Al-Muttalib','+234 802 002 0048','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','26 Apr 2024','01 May 2024, 11:55 AM',94),
  makeStudent('s-249','AM-2026-104','Hanbal Ibn Hilal Jr','Hilal Al-Shaybani','+234 802 002 0049','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','26 Apr 2024','01 May 2024, 12:00 PM',89),
  makeStudent('s-250','AM-2026-105','Malik Ibn Anas Jr','Anas Al-Madani','+234 802 002 0050','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','30 Apr 2024','05 May 2024, 12:05 PM',97),
  makeStudent('s-251','AM-2026-106','Abu Hanifah Al-Numan Jr','Al-Numan Thaabit','+234 802 002 0051','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','30 Apr 2024','05 May 2024, 12:10 PM',100),
  makeStudent('s-252','AM-2026-107','Layth Ibn Sad Jr','Sad Al-Fahmi','+234 802 002 0052','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','30 Apr 2024','05 May 2024, 12:15 PM',92),
  makeStudent('s-253','AM-2026-108','Awzai Al-Shami Jr','Al-Shami Bilal','+234 802 002 0053','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','03 May 2024','08 May 2024, 12:20 PM',88),
  makeStudent('s-254','AM-2026-109','Thawri Al-Kufi Jr','Al-Kufi Ridwan','+234 802 002 0054','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','03 May 2024','08 May 2024, 12:25 PM',95),
  makeStudent('s-255','AM-2026-110','Zuhayr Ibn Muawiyah Jr','Muawiyah Al-Jufi','+234 802 002 0055','Class Hifz-2','tch-002','Ustadh Bilal Ahmad','03 May 2024','08 May 2024, 12:30 PM',91),
];

// ── CLASS HIFZ-3 (55 students) — Teacher: Ustadh Yusuf Ibrahim (tch-003) ──
const hifz3Students: Student[] = Array.from({ length: 55 }, (_, i) => {
  const num = i + 1;
  const codes = ['AM-2026-111','AM-2026-112','AM-2026-113','AM-2026-114','AM-2026-115','AM-2026-116','AM-2026-117','AM-2026-118','AM-2026-119','AM-2026-120'];
  const names = [
    'Bilal Ahmad Jr','Hamza Farooq','Salim Al-Khattab','Umar Al-Farouq Jr','Khalid Al-Faris',
    'Nuh Al-Ansari','Yunus Al-Khalil','Hud Al-Aamiri','Shu\'ayb Al-Madyani','Salih Al-Thamudi',
    'Ismail Al-Khalil Jr','Ishaq Al-Kanaan','Yaqub Al-Isbahani','Yusuf Al-Siddiq Jr','Lut Al-Babili',
    'Al-Yasa Al-Bisri','Dhul Kifl Al-Iraqi','Al-Khadir Al-Bahri','Luqman Al-Hakim Jr','Idris Al-Khannukh',
    'Zakariya Al-Qudsi','Yahya Al-Urduni','Isa Al-Nasiri Jr','Muhammad Al-Madani Jr','Adam Al-Asli',
    'Ibrahim Al-Nimr','Suleiman Al-Daudi Jr','Dawud Al-Zaburi Jr','Musa Al-Sinai Jr','Harun Al-Sinai Jr',
    'Yusuf Al-Aziz Jr','Ayyub Al-Sabir Jr','Jibril Al-Rasuli','Mikail Al-Rizqi','Israfil Al-Baathi',
    'Munkar Al-Qabri','Nakir Al-Qabri','Ridwan Al-Jannati','Malik Al-Jahannami','Jibreel Al-Ansari',
    'Rakib Al-Ameen','Atid Al-Hafidh','Raqib Al-Shahid','Azrail Al-Mawt','Ismail Al-Khatib',
    'Harith Al-Ashari','Tamim Al-Dari Jr','Dihyah Al-Kalbi Jr','Zayd Al-Khayr','Muadhah Al-Adawiyyah',
    'Khuzaymah Al-Ansari','Buraydah Al-Aslami','Uqbah Al-Nafi','Khalid Al-Walidi','Amr Al-Asi Jr',
  ];
  const guardianNames = names.map(n => n.split(' ').slice(1).join(' ') + ' Sr');
  const idx = (i % names.length);
  const rate = 85 + (num % 15);
  return makeStudent(
    `s-3${String(num).padStart(2,'0')}`,
    codes[i % codes.length].replace(/\d+$/, m => String(parseInt(m) + i)),
    names[idx] || `Student Hifz3 ${num}`,
    guardianNames[idx] || `Guardian ${num}`,
    `+234 805 003 ${String(num).padStart(4,'0')}`,
    'Class Hifz-3',
    'tch-003',
    'Ustadh Yusuf Ibrahim',
    `${String(1 + (i % 28)).padStart(2,'0')} Aug 2024`,
    `${String(10 + (i % 20)).padStart(2,'0')} Aug 2024, 09:00 AM`,
    rate,
  );
});

// ── CLASS HIFZ-4 (55 students) — Teacher: Qari Tariq Mahmood (tch-004) ──
const hifz4Students: Student[] = Array.from({ length: 55 }, (_, i) => {
  const num = i + 1;
  const names = [
    'Yasin Al-Maghribi','Idris Al-Sanusi','Musa Al-Khatim','Dawud Al-Makkawi','Nuh Al-Nubian',
    'Ibraheem Badawi','Sulayman Al-Qadiri','Ahmad Al-Tidiani','Umar Al-Futi','Khalid Al-Wifaq',
    'Yusuf Kano','Ibrahim Katsina','Zayd Sokoto','Aminu Maiduguri','Bello Abuja',
    'Hamza Kaduna','Musa Zaria','Isa Keffi','Ali Bauchi','Sani Gombe',
    'Amadu Borno','Lawan Yobe','Usman Adamawa','Suleiman Taraba','Kabiru Benue',
    'Adamu Nasarawa','Garba Plateau','Lawal Kwara','Umar Kogi','Ahmad Niger',
    'Aliyu Kebbi','Wada Zamfara','Bawa Sokoto','Shu\'aibu Kano','Haruna Kaduna',
    'Salisu Katsina','Musa Jigawa','Ibrahim Bauchi','Sani Gombe Jr','Aminu Yobe Jr',
    'Bukar Borno Jr','Lawan Adamawa Jr','Usman Taraba Jr','Joseph Benue Jr','Emmanuel Nasarawa Jr',
    'Daniel Plateau Jr','Michael Kwara Jr','Samuel Kogi Jr','David Niger Jr','John Kebbi Jr',
    'Peter Zamfara Jr','Paul Sokoto Jr','James Kano Jr','Luke Kaduna Jr','Mark Katsina Jr',
  ];
  const rate = 86 + (num % 13);
  return makeStudent(
    `s-4${String(num).padStart(2,'0')}`,
    `AM-2026-${165 + i}`,
    names[i % names.length],
    `Guardian of ${names[i % names.length]}`,
    `+234 809 004 ${String(num).padStart(4,'0')}`,
    'Class Hifz-4',
    'tch-004',
    'Qari Tariq Mahmood',
    `${String(1 + (i % 28)).padStart(2,'0')} Nov 2024`,
    `${String(1 + (i % 28)).padStart(2,'0')} Nov 2024, 10:00 AM`,
    rate,
  );
});

// ── CLASS HIFZ-5 (55 students) — Teacher: Ustadh Omar Danjuma (tch-005) ──
const hifz5Students: Student[] = Array.from({ length: 55 }, (_, i) => {
  const num = i + 1;
  const names = [
    'Luqman Hakim Jr','Zakariya Al-Ansari Jr','Malik Al-Madani Jr','Ahmad Al-Masri Jr','Ibrahim Al-Shami Jr',
    'Umar Al-Iraqi Jr','Ali Al-Irani Jr','Hassan Al-Libi Jr','Husayn Al-Misri Jr','Hasan Al-Yamani Jr',
    'Muhammad Al-Jazairi Jr','Khalid Al-Sudani Jr','Tariq Al-Tunisi Jr','Bilal Al-Ghani Jr','Sulayman Al-Zangi Jr',
    'Hamza Al-Abyssini Jr','Salman Al-Habashi Jr','Ammar Al-Yemeni Jr','Miqdad Al-Omani Jr','Said Al-Bahraini Jr',
    'Uthman Al-Emirati Jr','Numan Al-Qatari Jr','Jabir Al-Kuwaiti Jr','Wathilah Al-Saudhi Jr','Bara Al-Jordani Jr',
    'Aws Al-Palestini Jr','Thawban Al-Lebani Jr','Khabbab Al-Suri Jr','Suhayb Al-Turki Jr','Hudhayfah Al-Azeri Jr',
    'Sad Al-Afghani Jr','Jafar Al-Pakistani Jr','Muawiyah Al-Indi Jr','Said Al-Malay Jr','Nafi Al-Indunisi Jr',
    'Laith Al-Singapuri Jr','Zubayr Al-Filipini Jr','Abd Al-Rahman Al-Ugandi Jr','Talhah Al-Tanzani Jr','Zuhayr Al-Kenyi Jr',
    'Iyadh Al-Ethiapi Jr','Mughirah Al-Somali Jr','Shaddad Al-Djiboutian Jr','Uqbah Al-Eritri Jr','Maslamah Al-Sudani Jr',
    'Fayruz Al-Yemeni Jr','Nuaym Al-Hadrami Jr','Qasim Al-Hadhrami Jr','Rajab Al-Yafii Jr','Sharaf Al-Hadhrami Jr',
    'Izz Al-Hadrami Jr','Majd Al-Yemeni Jr','Fath Al-Masri Jr','Nur Al-Madani Jr','Diya Al-Maki Jr',
  ];
  const rate = 84 + (num % 16);
  return makeStudent(
    `s-5${String(num).padStart(2,'0')}`,
    `AM-2026-${220 + i}`,
    names[i % names.length],
    `Guardian of ${names[i % names.length]}`,
    `+234 814 005 ${String(num).padStart(4,'0')}`,
    'Class Hifz-5',
    'tch-005',
    'Ustadh Omar Danjuma',
    `${String(1 + (i % 28)).padStart(2,'0')} Feb 2025`,
    `${String(14 + (i % 14)).padStart(2,'0')} Feb 2025, 02:00 PM`,
    rate,
  );
});

// ── CLASS HIFZ-6 (55 students) — Teacher: Qari Zaid Al-Hassan (tch-006) ──
const hifz6Students: Student[] = Array.from({ length: 55 }, (_, i) => {
  const num = i + 1;
  const names = [
    'Yahya Ibn Sharaf Jr','Musa Al-Ashari Jr','Hasan Al-Shafi Jr','Husayn Al-Hanbali Jr','Ahmad Al-Maliki Jr',
    'Umar Al-Hanafi Jr','Ali Al-Salafi Jr','Muhammad Al-Athari Jr','Ibrahim Al-Ashari Jr','Zayd Al-Mutazili Jr',
    'Amr Al-Khariji Jr','Nuh Al-Murjii Jr','Yunus Al-Qadarhi Jr','Hud Al-Jabri Jr','Salih Al-Maturidi Jr',
    'Ismail Al-Taftazani Jr','Ishaq Al-Jurjani Jr','Yaqub Al-Nasafi Jr','Yusuf Al-Baydawi Jr','Lut Al-Zamakhshari Jr',
    'Al-Yasa Al-Razi Jr','Dhul-Kifl Al-Baghawi Jr','Khadir Al-Suyuti Jr','Luqman Al-Qurtubi Jr','Idris Al-Nawawi Jr',
    'Zakariya Al-Asqalani Jr','Yahya Al-Dhahabi Jr','Isa Al-Haythami Jr','Muhammad Al-Busiri Jr','Adam Al-Safadi Jr',
    'Ibrahim Al-Subki Jr','Suleiman Al-Isnawi Jr','Dawud Al-Zarkashi Jr','Musa Al-Dimashqi Jr','Harun Al-Halabi Jr',
    'Yusuf Al-Himyari Jr','Ayyub Al-Ansari Jr','Jibril Al-Madani Jr','Mikail Al-Makki Jr','Israfil Al-Yamani Jr',
    'Munkar Al-Shami Jr','Nakir Al-Iraqi Jr','Ridwan Al-Hijazi Jr','Malik Al-Najdi Jr','Jibreel Al-Qasimi Jr',
    'Rakib Al-Dimashqi Jr','Atid Al-Halabi Jr','Raqib Al-Lubnani Jr','Azrail Al-Misri Jr','Ismail Al-Dimashqi Jr',
    'Harith Al-Shami Jr','Tamim Al-Misri Jr','Dihyah Al-Kindi Jr','Zayd Al-Qasimi Jr','Abd Al-Qadir Al-Gilani Jr',
  ];
  const rate = 83 + (num % 17);
  const status: 'active' | 'suspended' = num === 12 ? 'suspended' : 'active';
  return makeStudent(
    `s-6${String(num).padStart(2,'0')}`,
    `AM-2026-${275 + i}`,
    names[i % names.length],
    `Guardian of ${names[i % names.length]}`,
    `+234 818 006 ${String(num).padStart(4,'0')}`,
    'Class Hifz-6',
    'tch-006',
    'Qari Zaid Al-Hassan',
    `${String(1 + (i % 28)).padStart(2,'0')} May 2025`,
    `${String(20 + (i % 8)).padStart(2,'0')} May 2025, 08:00 AM`,
    rate,
    status,
  );
});

export const INITIAL_STUDENTS: Student[] = [
  ...hifz1Students,
  ...hifz2Students,
  ...hifz3Students,
  ...hifz4Students,
  ...hifz5Students,
  ...hifz6Students,
];

export const STUDENT_CLASSES = [
  'Class Hifz-1',
  'Class Hifz-2',
  'Class Hifz-3',
  'Class Hifz-4',
  'Class Hifz-5',
  'Class Hifz-6',
];

export const CLASS_TEACHER_MAP: Record<string, { id: string; name: string }> = {
  'Class Hifz-1': { id: 'tch-001', name: 'Qari Abdul Rahman Al-Sudani' },
  'Class Hifz-2': { id: 'tch-002', name: 'Ustadh Bilal Ahmad' },
  'Class Hifz-3': { id: 'tch-003', name: 'Ustadh Yusuf Ibrahim' },
  'Class Hifz-4': { id: 'tch-004', name: 'Qari Tariq Mahmood' },
  'Class Hifz-5': { id: 'tch-005', name: 'Ustadh Omar Danjuma' },
  'Class Hifz-6': { id: 'tch-006', name: 'Qari Zaid Al-Hassan' },
};

