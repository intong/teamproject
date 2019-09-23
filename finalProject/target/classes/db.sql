insert into youn_test value ("아뇽");
use dee123456
show tables;
select * from youn_test



show databases;
use dee123456
create table youn_finalTest (
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

