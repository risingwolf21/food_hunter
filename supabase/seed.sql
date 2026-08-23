SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 6DauXm6mHswUtXNJ9cBKzqZMDAX1Lx9tVYNE2fmElcklRmC4mtRYVC5B9PE2SQk

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
	('00000000-0000-0000-0000-000000000000', 'a02343ef-5813-4d2a-94d6-c663826937c8', '{"action":"token_revoked","actor_id":"54934b98-585d-42ab-ae72-aa61d56b2f83","actor_name":"Karl Wolf","actor_username":"karl.wolf2706@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-08-23 16:19:03.349831+00', '');


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
	('00000000-0000-0000-0000-000000000000', '54934b98-585d-42ab-ae72-aa61d56b2f83', 'authenticated', 'authenticated', 'karl.wolf2706@gmail.com', '$2a$10$kZFGHrqXXj4DwqKwSlGk7OCYzh/3VRTab1XHcnyACrCGa3dLFvR2m', '2026-08-21 15:44:05.693659+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-21 17:17:44.477325+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "54934b98-585d-42ab-ae72-aa61d56b2f83", "email": "karl.wolf2706@gmail.com", "full_name": "Karl Wolf", "email_verified": true, "phone_verified": false}', NULL, '2026-08-21 15:44:05.687996+00', '2026-08-23 16:19:03.351576+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('54934b98-585d-42ab-ae72-aa61d56b2f83', '54934b98-585d-42ab-ae72-aa61d56b2f83', '{"sub": "54934b98-585d-42ab-ae72-aa61d56b2f83", "email": "karl.wolf2706@gmail.com", "full_name": "Karl Wolf", "email_verified": false, "phone_verified": false}', 'email', '2026-08-21 15:44:05.691816+00', '2026-08-21 15:44:05.691831+00', '2026-08-21 15:44:05.691831+00', '2505d7cb-0304-4740-aa93-1879567f4c32');


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
	('ddf5f1fa-7a88-4a1f-aadb-f9d9ed030af6', '54934b98-585d-42ab-ae72-aa61d56b2f83', '2026-08-21 17:17:44.477383+00', '2026-08-21 17:17:44.477383+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '192.168.65.1', NULL, NULL, NULL, NULL, NULL),
	('b7880645-106f-481c-b556-bc90977a05bd', '54934b98-585d-42ab-ae72-aa61d56b2f83', '2026-08-21 15:44:05.699155+00', '2026-08-23 08:02:28.569537+00', NULL, 'aal1', NULL, '2026-08-23 08:02:28.569498', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:154.0) Gecko/20100101 Firefox/154.0', '192.168.65.1', NULL, NULL, NULL, NULL, NULL),
	('87f7851e-b473-4c2f-b19f-c2d7e790a0cc', '54934b98-585d-42ab-ae72-aa61d56b2f83', '2026-08-21 16:13:14.582905+00', '2026-08-23 16:19:03.35273+00', NULL, 'aal1', NULL, '2026-08-23 16:19:03.352678', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '192.168.65.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('b7880645-106f-481c-b556-bc90977a05bd', '2026-08-21 15:44:05.701525+00', '2026-08-21 15:44:05.701525+00', 'password', 'dfe0d538-9424-4294-a724-3a72d0aac81b'),
	('87f7851e-b473-4c2f-b19f-c2d7e790a0cc', '2026-08-21 16:13:14.584965+00', '2026-08-21 16:13:14.584965+00', 'password', '381b2aae-2d08-4f99-b83d-c0af0ba2b02b'),
	('ddf5f1fa-7a88-4a1f-aadb-f9d9ed030af6', '2026-08-21 17:17:44.479671+00', '2026-08-21 17:17:44.479671+00', 'password', '5d02331a-7898-434e-b590-723498fc1526');


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
	('00000000-0000-0000-0000-000000000000', 1, 'djfzhsydddpw', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 15:44:05.700433+00', '2026-08-21 16:53:44.899763+00', NULL, 'b7880645-106f-481c-b556-bc90977a05bd'),
	('00000000-0000-0000-0000-000000000000', 2, 'o6vmnjhwttt5', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 16:13:14.583991+00', '2026-08-21 17:12:08.570309+00', NULL, '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 5, 'iyap3nhxoslp', '54934b98-585d-42ab-ae72-aa61d56b2f83', false, '2026-08-21 17:17:44.478591+00', '2026-08-21 17:17:44.478591+00', NULL, 'ddf5f1fa-7a88-4a1f-aadb-f9d9ed030af6'),
	('00000000-0000-0000-0000-000000000000', 3, 'kfip3bjcxgc5', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 16:53:44.900982+00', '2026-08-21 17:59:32.591799+00', 'djfzhsydddpw', 'b7880645-106f-481c-b556-bc90977a05bd'),
	('00000000-0000-0000-0000-000000000000', 4, 'dl6awhcyny5i', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 17:12:08.570651+00', '2026-08-21 18:11:35.231692+00', 'o6vmnjhwttt5', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 6, 'ytshb2kqer45', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 17:59:32.592699+00', '2026-08-21 19:55:42.945402+00', 'kfip3bjcxgc5', 'b7880645-106f-481c-b556-bc90977a05bd'),
	('00000000-0000-0000-0000-000000000000', 7, 'yaou5k7hef6w', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 18:11:35.232239+00', '2026-08-21 19:57:07.319523+00', 'dl6awhcyny5i', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 8, 'm2a6kzmtfq5p', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 19:55:42.945995+00', '2026-08-23 08:02:28.562389+00', 'ytshb2kqer45', 'b7880645-106f-481c-b556-bc90977a05bd'),
	('00000000-0000-0000-0000-000000000000', 10, 'cyc3wmppq5nq', '54934b98-585d-42ab-ae72-aa61d56b2f83', false, '2026-08-23 08:02:28.566405+00', '2026-08-23 08:02:28.566405+00', 'm2a6kzmtfq5p', 'b7880645-106f-481c-b556-bc90977a05bd'),
	('00000000-0000-0000-0000-000000000000', 9, 'zb4d4bqf5ulm', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-21 19:57:07.319833+00', '2026-08-23 08:07:33.158482+00', 'yaou5k7hef6w', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 11, 'xvnwby7fjsl4', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-23 08:07:33.159248+00', '2026-08-23 09:05:33.428199+00', 'zb4d4bqf5ulm', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 12, 'uedqf37rb5uy', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-23 09:05:33.428802+00', '2026-08-23 10:03:40.110398+00', 'xvnwby7fjsl4', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 13, '75qmpyxiunjr', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-23 10:03:40.110937+00', '2026-08-23 11:02:07.981667+00', 'uedqf37rb5uy', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 14, 'aszz4dhdhsuf', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-23 11:02:07.98489+00', '2026-08-23 12:00:27.542284+00', '75qmpyxiunjr', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 15, 'dccnzgfurawl', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-23 12:00:27.542861+00', '2026-08-23 14:48:08.832482+00', 'aszz4dhdhsuf', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 16, '34yytjoniwjv', '54934b98-585d-42ab-ae72-aa61d56b2f83', true, '2026-08-23 14:48:08.833292+00', '2026-08-23 16:19:03.350186+00', 'dccnzgfurawl', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc'),
	('00000000-0000-0000-0000-000000000000', 17, 'xmbvuos6faio', '54934b98-585d-42ab-ae72-aa61d56b2f83', false, '2026-08-23 16:19:03.350826+00', '2026-08-23 16:19:03.350826+00', '34yytjoniwjv', '87f7851e-b473-4c2f-b19f-c2d7e790a0cc');


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

INSERT INTO "public"."profiles" ("id", "display_name", "home_lat", "home_lng", "home_label", "created_at") VALUES
	('54934b98-585d-42ab-ae72-aa61d56b2f83', NULL, 48.1645169, 11.5754043, 'Destouchesstraße 57, 80803 München, Deutschland', '2026-08-21 15:44:05.687804+00');


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--



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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 17, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 6DauXm6mHswUtXNJ9cBKzqZMDAX1Lx9tVYNE2fmElcklRmC4mtRYVC5B9PE2SQk

RESET ALL;
