SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict KKpZhUv5jFVTrbGU2FonajHfPgBvb7qWjlQ9QkZlu78deiy9I9aNWxXbwFRA29Y

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '63ecd0f0-ebf7-49bf-84d4-7789610a9ce6', '{"action":"user_signedup","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-08-21 15:44:05.693118+00', ''),
	('00000000-0000-0000-0000-000000000000', '12ef1aa1-308f-48f7-b6db-8cdab28363d5', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-21 15:44:05.698469+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b01591e-3439-4a44-8a21-d8b323823560', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-21 16:13:14.58213+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb3d7988-6155-4f26-abc0-beea3139a63e', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 16:53:44.898107+00', ''),
	('00000000-0000-0000-0000-000000000000', '4afed6e2-cc12-4397-a61c-c3439418807d', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 16:53:44.898975+00', ''),
	('00000000-0000-0000-0000-000000000000', '90b0398f-7850-4592-9930-fa974339f7ac', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 17:12:08.569305+00', ''),
	('00000000-0000-0000-0000-000000000000', '4cd54154-f50e-453c-8fa6-304945d11f42', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 17:12:08.569774+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f66dd6df-e001-4a6e-b089-ec434b82c11b', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-21 17:17:44.476482+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a381429-029f-4d26-8259-1bdfa5564c88', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 17:59:32.58968+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f376a72-ee6b-4395-b2af-e5a9910340be', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 17:59:32.59128+00', ''),
	('00000000-0000-0000-0000-000000000000', '718b26cb-f55c-4bd0-907a-816fb56ec699', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 18:11:35.230688+00', ''),
	('00000000-0000-0000-0000-000000000000', '06772fb2-abfd-48f8-82d5-3e761d6d2f97', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 18:11:35.231314+00', ''),
	('00000000-0000-0000-0000-000000000000', '1964fb92-d2b6-477a-8a57-7ed4c8574e0f', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 19:55:42.944373+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e6b12f8-0898-4706-9c6d-b6386be86523', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 19:55:42.945106+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f44fdf8-540b-4c9c-be54-06e0157c4de5', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 19:57:07.318826+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b4084f7-a4ba-4ed7-ae00-492d4295d0c9', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-21 19:57:07.319211+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1db7b74-2f35-4e68-93b9-fef4ba35e616', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 08:02:28.560247+00', ''),
	('00000000-0000-0000-0000-000000000000', '26c541fd-d705-4564-bb46-5e897e729fb2', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 08:02:28.562026+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be16e0e8-e39c-41a6-be13-94f84a0d8018', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 08:07:33.156223+00', ''),
	('00000000-0000-0000-0000-000000000000', '636654ff-a2a6-4e23-9730-a87070af9297', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 08:07:33.157713+00', ''),
	('00000000-0000-0000-0000-000000000000', '10251e7a-d7f4-4fb6-8230-f80c13106791', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 09:05:33.426983+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c311c67f-d736-4359-b4f6-14cd0facdfb5', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 09:05:33.42773+00', ''),
	('00000000-0000-0000-0000-000000000000', '411af6a1-a04a-4d10-a1e9-a4df287d5a0f', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 10:03:40.109268+00', ''),
	('00000000-0000-0000-0000-000000000000', '39125866-e30e-4285-9174-5bf44d8b072d', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 10:03:40.109907+00', ''),
	('00000000-0000-0000-0000-000000000000', '6499e6e8-daec-40fd-a686-c25bae8043b5', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 11:02:07.97275+00', ''),
	('00000000-0000-0000-0000-000000000000', '661366cb-8861-4661-935a-cbff505d22bc', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 11:02:07.97516+00', ''),
	('00000000-0000-0000-0000-000000000000', '2bb17c29-2dbd-4e85-a2c4-60565067f769', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 12:00:27.540937+00', ''),
	('00000000-0000-0000-0000-000000000000', '5cb67004-a4a0-44db-a15d-8f463a4bc0d8', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 12:00:27.541855+00', ''),
	('00000000-0000-0000-0000-000000000000', '8669d4dd-df64-46f4-91dc-7b8c60614053', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 14:48:08.830887+00', ''),
	('00000000-0000-0000-0000-000000000000', '535844a9-2043-4ab4-9f2f-4ac044045e31', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 14:48:08.8319+00', ''),
	('00000000-0000-0000-0000-000000000000', '1dcafe5c-e926-4219-9c71-43575754b7af', '{"action":"token_refreshed","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 16:19:03.348446+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a02343ef-5813-4d2a-94d6-c663826937c8', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 16:19:03.349831+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ea43bd6-1f1a-4e42-8cb8-8c06191088af', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-23 18:31:48.587008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fabcdb74-ceb9-4288-88ac-cf696d6a01f2', '{"action":"logout","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-08-23 18:36:24.136409+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a423c8a4-969f-4b64-950d-3299e67d5db0', '{"action":"user_signedup","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-08-23 18:36:41.134074+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4634fa8-b998-47a1-b6f2-d10ffceb20cc', '{"action":"login","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-23 18:36:41.143382+00', ''),
	('00000000-0000-0000-0000-000000000000', '27b23fec-ec94-47c9-b658-5a31ff2dbbff', '{"action":"logout","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"account"}', '2026-08-23 18:36:44.040739+00', ''),
	('00000000-0000-0000-0000-000000000000', '4dadab85-bd24-4ad7-b774-030dacd5ddd1', '{"action":"user_signedup","actor_id":"190dff60-9072-4abc-a00b-f5f31890da41","actor_name":"Jane Smith","actor_username":"jane@smith.de","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-08-23 18:36:58.392755+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c85c27c2-1c3e-4197-b548-fa1b9bf837d7', '{"action":"login","actor_id":"190dff60-9072-4abc-a00b-f5f31890da41","actor_name":"Jane Smith","actor_username":"jane@smith.de","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-23 18:36:58.402566+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c657657-59b6-4f52-b4b1-e1e692af3d2e', '{"action":"logout","actor_id":"190dff60-9072-4abc-a00b-f5f31890da41","actor_name":"Jane Smith","actor_username":"jane@smith.de","actor_via_sso":false,"log_type":"account"}', '2026-08-23 18:37:00.461892+00', ''),
	('00000000-0000-0000-0000-000000000000', '75fd2705-852b-4b1c-99da-fabbba0d2d22', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-23 18:37:06.239439+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb83f8bb-29b2-43ff-a859-9d3c55d202a0', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-25 14:57:48.702185+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f38b7128-4edf-4026-bbaf-6ba7166bdbef', '{"action":"logout","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-08-25 14:59:23.24936+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f394533-28a6-4cec-beb1-2d8ee0cee0a7', '{"action":"login","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-25 14:59:29.256586+00', ''),
	('00000000-0000-0000-0000-000000000000', 'edaefc5b-dd32-4647-997d-c01831794739', '{"action":"logout","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"account"}', '2026-08-25 14:59:59.403598+00', ''),
	('00000000-0000-0000-0000-000000000000', '93bef954-af8c-47f7-88e8-1b57f0ab858a', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-25 15:00:03.159772+00', ''),
	('00000000-0000-0000-0000-000000000000', '178ef0ba-64f5-4138-b142-6e3c79f291e2', '{"action":"logout","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-08-25 15:38:54.218506+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1087a4f-4c81-46d8-ad57-c523db3f4b71', '{"action":"login","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-25 15:39:28.669695+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2624f2b-d456-43f2-87ee-d4650d63b0ec', '{"action":"logout","actor_id":"67325ad0-6c07-4da2-b7e7-798cf2cfa2a1","actor_name":"Max Mustermann","actor_username":"max@mustermann.de","actor_via_sso":false,"log_type":"account"}', '2026-08-25 15:44:02.323767+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd005a6f-fc97-47a4-b6a0-2fc59ce1074b', '{"action":"login","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-08-25 15:44:06.608326+00', '');


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '190dff60-9072-4abc-a00b-f5f31890da41', 'authenticated', 'authenticated', 'jane@smith.de', '$2a$10$DRH9GOJZPCoWUJuvXwz9auwSE7YFP4/XoBqcyUmbHdeKM.1RFtrJ6', '2026-08-23 18:36:58.393148+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-23 18:36:58.403408+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "190dff60-9072-4abc-a00b-f5f31890da41", "email": "jane@smith.de", "full_name": "Jane Smith", "email_verified": true, "phone_verified": false}', NULL, '2026-08-23 18:36:58.388332+00', '2026-08-23 18:36:58.40573+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', 'authenticated', 'authenticated', 'max@mustermann.de', '$2a$10$/mcPTm9RQSQWFcrf2eTmauOCBTi2CmJJD2MXs27.p4zwqqyKQW6G2', '2026-08-23 18:36:41.134493+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-25 15:39:28.670859+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "67325ad0-6c07-4da2-b7e7-798cf2cfa2a1", "email": "max@mustermann.de", "full_name": "Max Mustermann", "email_verified": true, "phone_verified": false}', NULL, '2026-08-23 18:36:41.125288+00', '2026-08-25 15:39:28.673571+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '54934b98-585d-42ab-ae72-aa61d56b2f83', 'authenticated', 'authenticated', 'karl.wolf2706@gmail.com', '$2a$10$kZFGHrqXXj4DwqKwSlGk7OCYzh/3VRTab1XHcnyACrCGa3dLFvR2m', '2026-08-21 15:44:05.693659+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-25 15:44:06.609204+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "54934b98-585d-42ab-ae72-aa61d56b2f83", "email": "karl.wolf2706@gmail.com", "full_name": "Karl Wolf", "email_verified": true, "phone_verified": false}', NULL, '2026-08-21 15:44:05.687996+00', '2026-08-25 15:44:06.611743+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('54934b98-585d-42ab-ae72-aa61d56b2f83', '54934b98-585d-42ab-ae72-aa61d56b2f83', '{"sub": "54934b98-585d-42ab-ae72-aa61d56b2f83", "email": "karl.wolf2706@gmail.com", "full_name": "Karl Wolf", "email_verified": false, "phone_verified": false}', 'email', '2026-08-21 15:44:05.691816+00', '2026-08-21 15:44:05.691831+00', '2026-08-21 15:44:05.691831+00', '2505d7cb-0304-4740-aa93-1879567f4c32'),
	('67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', '67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', '{"sub": "67325ad0-6c07-4da2-b7e7-798cf2cfa2a1", "email": "max@mustermann.de", "full_name": "Max Mustermann", "email_verified": false, "phone_verified": false}', 'email', '2026-08-23 18:36:41.132201+00', '2026-08-23 18:36:41.132233+00', '2026-08-23 18:36:41.132233+00', 'c126e71a-06b4-4189-8c57-9ecba75d40cf'),
	('190dff60-9072-4abc-a00b-f5f31890da41', '190dff60-9072-4abc-a00b-f5f31890da41', '{"sub": "190dff60-9072-4abc-a00b-f5f31890da41", "email": "jane@smith.de", "full_name": "Jane Smith", "email_verified": false, "phone_verified": false}', 'email', '2026-08-23 18:36:58.39138+00', '2026-08-23 18:36:58.391402+00', '2026-08-23 18:36:58.391402+00', '9e7c75e7-e09a-4e60-a460-0a3ed449477d');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('28b34fb5-3114-436d-afff-605f8f78b12c', '54934b98-585d-42ab-ae72-aa61d56b2f83', '2026-08-25 15:44:06.609259+00', '2026-08-25 15:44:06.609259+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '172.19.0.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('28b34fb5-3114-436d-afff-605f8f78b12c', '2026-08-25 15:44:06.612119+00', '2026-08-25 15:44:06.612119+00', 'password', 'b1e0a87c-a975-47cb-b161-411c1487e178');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 26, 'jyjycb7p23ek', '54934b98-585d-42ab-ae72-aa61d56b2f83', false, '2026-08-25 15:44:06.610665+00', '2026-08-25 15:44:06.610665+00', NULL, '28b34fb5-3114-436d-afff-605f8f78b12c');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "display_name", "home_lat", "home_lng", "home_label", "created_at", "username") VALUES
	('54934b98-585d-42ab-ae72-aa61d56b2f83', 'Karl Wolf', 48.1645169, 11.5754043, 'Destouchesstraße 57, 80803 München, Deutschland', '2026-08-21 15:44:05.687804+00', 'karl_wolf'),
	('190dff60-9072-4abc-a00b-f5f31890da41', 'Max Mustermann', NULL, NULL, NULL, '2026-08-23 18:36:58.388145+00', 'max_mustermann'),
	('67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', 'Jane Smith', 48.1371079, 11.5753822, 'BY, Deutschland', '2026-08-23 18:36:41.124994+00', 'jane_smith');


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."restaurants" ("id", "name", "lat", "lng", "address", "cuisine", "created_at", "place_id", "phone", "website", "email", "opening_hours", "wheelchair_accessible", "wheelchair_limited", "wheelchair_description", "internet_access", "outdoor_seating", "takeaway", "delivery", "diet_vegan", "diet_vegetarian", "diet_halal", "diet_kosher", "payment_options", "categories", "last_synced_at") VALUES
	('65b55338-b590-48a4-b9a1-28263a2ccd47', 'Dosage', 48.1382981, 11.5778267, 'Old Court 3, 80331 Munich, Germany', NULL, '2026-08-25 14:59:47.71298+00', '51de82b6e6d8272740592b188cc0b3114840f00103f901744ec0ae00000000920306446f73616765', '+49 89 709 500 86', 'https://off-events.com/quartiere/dosage-bar/', NULL, NULL, true, false, NULL, false, true, false, false, false, false, false, false, NULL, NULL, '2026-08-25 14:59:47.703+00'),
	('b27e0146-9198-42f0-8970-53a7471df2da', 'Two in One', 48.1636105, 11.5776222, 'Pündterplatz 8, 80803 Munich, Germany', NULL, '2026-08-25 15:35:46.340257+00', '511ce3d418be27274059432c5930f1144840f00103f901d6fc38e90000000092030a54776f20696e204f6e65', '+49 89 3407 6430', 'https://www.twoinone-muenchen.de/', NULL, 'Mo,Su,PH off; We-Sa 10:00-18:30', NULL, NULL, NULL, false, false, false, false, true, true, false, false, NULL, NULL, '2026-08-25 15:35:48.607+00'),
	('12e0a519-21ee-43e1-9e45-1ee750113ee3', 'Ratskeller Weinstube', 48.1381636, 11.5756549, 'Landschaftstraße, 80331 Munich, Germany', NULL, '2026-08-25 15:43:33.086567+00', '517590323dbc26274059378b4758af114840f00103f90107adb01a00000000920314526174736b656c6c6572205765696e7374756265', NULL, NULL, NULL, 'Mo-Sa 10:00-01:00; Su 10:00-00:00', true, false, NULL, false, true, false, false, false, false, false, false, NULL, NULL, '2026-08-25 15:43:48.258+00');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."comments" ("id", "user_id", "restaurant_id", "body", "created_at", "updated_at") VALUES
	('0e1e86db-a842-4996-9a6f-7c220f91c144', '54934b98-585d-42ab-ae72-aa61d56b2f83', 'b27e0146-9198-42f0-8970-53a7471df2da', 'asdfasfd', '2026-08-25 15:35:51.304571+00', '2026-08-25 15:35:51.304571+00'),
	('81a8832f-a75b-4d10-b101-8cb804b17b49', '54934b98-585d-42ab-ae72-aa61d56b2f83', 'b27e0146-9198-42f0-8970-53a7471df2da', 'asdfasfd', '2026-08-25 15:36:01.647054+00', '2026-08-25 15:36:01.647054+00');


--
-- Data for Name: friendships; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."friendships" ("id", "requester_id", "addressee_id", "status", "created_at") VALUES
	('0d765fab-7fe1-4ffa-8d59-ec1869b7dc62', '54934b98-585d-42ab-ae72-aa61d56b2f83', '190dff60-9072-4abc-a00b-f5f31890da41', 'pending', '2026-08-25 14:59:21.599937+00'),
	('e1c15c68-566b-445a-bd57-61e64ab2dbf8', '54934b98-585d-42ab-ae72-aa61d56b2f83', '67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', 'accepted', '2026-08-25 14:59:16.526597+00');


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."ratings" ("id", "user_id", "restaurant_id", "rating", "created_at", "updated_at") VALUES
	('5a9dfcd0-b57d-47d1-8cfa-f4d9ae7124ec', '54934b98-585d-42ab-ae72-aa61d56b2f83', 'b27e0146-9198-42f0-8970-53a7471df2da', 5, '2026-08-25 15:35:53.320784+00', '2026-08-25 15:35:57.822686+00'),
	('741dce95-df2a-4afe-9e61-3b0caf1f9b17', '67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', '12e0a519-21ee-43e1-9e45-1ee750113ee3', 5, '2026-08-25 15:43:49.536649+00', '2026-08-25 15:43:49.536649+00');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."visits" ("id", "user_id", "restaurant_id", "visited_at", "rating", "note", "created_at") VALUES
	('09af9f30-895a-418a-8c3e-80bf1c839c5d', '67325ad0-6c07-4da2-b7e7-798cf2cfa2a1', '65b55338-b590-48a4-b9a1-28263a2ccd47', '2026-08-25', NULL, NULL, '2026-08-25 14:59:47.72372+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 26, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict KKpZhUv5jFVTrbGU2FonajHfPgBvb7qWjlQ9QkZlu78deiy9I9aNWxXbwFRA29Y

RESET ALL;
