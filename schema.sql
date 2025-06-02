create table sys_user
(
    id           varchar(32)                         not null
        primary key,
    name         varchar(16)                         not null,
    gender       varchar(8)                          not null,
    account      varchar(16)                         not null,
    password     varchar(64)                         not null,
    mobile_phone varchar(16)                         not null,
    birthday     date                                not null,
    enabled      boolean   default true              not null,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_at   timestamp default CURRENT_TIMESTAMP not null
);

alter table sys_user
    owner to postgres;

INSERT INTO sys_user (id, name, gender, account, password, mobile_phone, birthday, enabled, created_at, updated_at) VALUES ('6202954260741', '李四', 'female', 'lisi', '$2b$12$PsumwxjxX/o1RNOKpkc.Kuxea0izqSuhaod4PCudXoRh3zet1TASK', '17361631996', '2025-05-13', true, '2025-05-18 12:39:53.133469', '2025-05-18 12:39:53.133469');
INSERT INTO sys_user (id, name, gender, account, password, mobile_phone, birthday, enabled, created_at, updated_at) VALUES ('6161671639301', '张三', 'male', 'admin', '$2b$12$PsumwxjxX/o1RNOKpkc.Kuxea0izqSuhaod4PCudXoRh3zet1TASK', '19909407240', '2025-05-18', false, '2025-05-18 09:51:54.367501', '2025-05-18 09:51:54.367501');
INSERT INTO sys_user (id, name, gender, account, password, mobile_phone, birthday, enabled, created_at, updated_at) VALUES ('11467064770821', '赵六', 'female', 'zhaoliu', '$2b$12$EJOKHLJLnfHrgrXbZl8uge3N4VEgR9FWHwq3a6pgTIM8O66Lf/9DW', '18361631783', '2025-06-11', true, '2025-06-02 09:39:36.366121', '2025-06-02 09:39:36.366121');
