insert into youn_test value ("아뇽");
use dee123456
show tables;
select * from youn_test



show databases;
use dee123456
create table sep16_member (
	m_id	varchar (45) primary key,
	m_pass	varchar (100) not null,
	m_name	varchar (45) not null,
	m_birth varchar (45) not null
);


select * from youn_finalTest

select * from youn_finalTest where m_id='kim'

create table youn_scheduleTest(
	s_no int(50) not null auto_increment primary key,
	s_id varchar(45) not null,
	s_content varchar(200) not null,
	s_stime datetime,
	s_etime datetime,
	s_part varchar(45),
	s_todocheck int not null
)


insert into youn_scheduleTest values ();

select * from sep24_member


select * from sep16_schedule,sep24_member where (s_id='audidas' or s_part ='audidas') and s_id=m_id

select * from sep16_schedule

alter table sep16_schedule add s_partKor varchar(2000);

alter table sep16_schedule change spart s_part varchar(2000) not null

alter table sep16_schedule modify column s_partKor varchar(2000) not null after s_part

truncate sep16_schedule

update sep16_schedule set s_partKor='이재호,박종훈,최승현',s_part='qwe,kim,audidas' where s_no=1

update sep16_schedule set s_partKor='이재호' where s_no=2
