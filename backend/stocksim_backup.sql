--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-10-29 23:14:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16423)
-- Name: fb_users; Type: TABLE; Schema: public; Owner: stockAdmin
--

CREATE TABLE public.fb_users (
    "fbId" character varying NOT NULL,
    user_id smallint NOT NULL
);


ALTER TABLE public.fb_users OWNER TO "stockAdmin";

--
-- TOC entry 207 (class 1259 OID 16496)
-- Name: google_users; Type: TABLE; Schema: public; Owner: stockAdmin
--

CREATE TABLE public.google_users (
    google_id character varying NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.google_users OWNER TO "stockAdmin";

--
-- TOC entry 205 (class 1259 OID 16446)
-- Name: portfolios; Type: TABLE; Schema: public; Owner: stockAdmin
--

CREATE TABLE public.portfolios (
    portfolio_name character varying NOT NULL,
    portfolio_id bigint NOT NULL,
    user_id smallint NOT NULL
);


ALTER TABLE public.portfolios OWNER TO "stockAdmin";

--
-- TOC entry 204 (class 1259 OID 16444)
-- Name: portfolios_portfolio_id_seq; Type: SEQUENCE; Schema: public; Owner: stockAdmin
--

CREATE SEQUENCE public.portfolios_portfolio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.portfolios_portfolio_id_seq OWNER TO "stockAdmin";

--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 204
-- Name: portfolios_portfolio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stockAdmin
--

ALTER SEQUENCE public.portfolios_portfolio_id_seq OWNED BY public.portfolios.portfolio_id;


--
-- TOC entry 201 (class 1259 OID 16406)
-- Name: stock_users; Type: TABLE; Schema: public; Owner: stockAdmin
--

CREATE TABLE public.stock_users (
    "Username" character varying NOT NULL,
    "Id" smallint NOT NULL
);


ALTER TABLE public.stock_users OWNER TO "stockAdmin";

--
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE stock_users; Type: COMMENT; Schema: public; Owner: stockAdmin
--

COMMENT ON TABLE public.stock_users IS 'User database for stockSim. ';


--
-- TOC entry 200 (class 1259 OID 16404)
-- Name: stock_users_Id_seq; Type: SEQUENCE; Schema: public; Owner: stockAdmin
--

CREATE SEQUENCE public."stock_users_Id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."stock_users_Id_seq" OWNER TO "stockAdmin";

--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 200
-- Name: stock_users_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stockAdmin
--

ALTER SEQUENCE public."stock_users_Id_seq" OWNED BY public.stock_users."Id";


--
-- TOC entry 203 (class 1259 OID 16436)
-- Name: transactions; Type: TABLE; Schema: public; Owner: stockAdmin
--

CREATE TABLE public.transactions (
    buy_sell character varying NOT NULL,
    portfolio_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric NOT NULL,
    stock_name character varying NOT NULL,
    date_of_sale timestamp with time zone NOT NULL,
    transaction_id bigint NOT NULL,
    sell_quantity integer,
    sell_price numeric
);


ALTER TABLE public.transactions OWNER TO "stockAdmin";

--
-- TOC entry 206 (class 1259 OID 16485)
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: stockAdmin
--

CREATE SEQUENCE public.transactions_transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_transaction_id_seq OWNER TO "stockAdmin";

--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 206
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stockAdmin
--

ALTER SEQUENCE public.transactions_transaction_id_seq OWNED BY public.transactions.transaction_id;


--
-- TOC entry 2877 (class 2604 OID 16449)
-- Name: portfolios portfolio_id; Type: DEFAULT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.portfolios ALTER COLUMN portfolio_id SET DEFAULT nextval('public.portfolios_portfolio_id_seq'::regclass);


--
-- TOC entry 2875 (class 2604 OID 16409)
-- Name: stock_users Id; Type: DEFAULT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.stock_users ALTER COLUMN "Id" SET DEFAULT nextval('public."stock_users_Id_seq"'::regclass);


--
-- TOC entry 2876 (class 2604 OID 16487)
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.transactions_transaction_id_seq'::regclass);


--
-- TOC entry 2881 (class 2606 OID 16430)
-- Name: fb_users fb_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.fb_users
    ADD CONSTRAINT fb_users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2887 (class 2606 OID 16503)
-- Name: google_users google_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.google_users
    ADD CONSTRAINT google_users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2885 (class 2606 OID 16454)
-- Name: portfolios portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_pkey PRIMARY KEY (portfolio_id);


--
-- TOC entry 2879 (class 2606 OID 16414)
-- Name: stock_users stock_users_pkey; Type: CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.stock_users
    ADD CONSTRAINT stock_users_pkey PRIMARY KEY ("Id");


--
-- TOC entry 2883 (class 2606 OID 16495)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 2888 (class 2606 OID 16431)
-- Name: fb_users stockUsers_Id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.fb_users
    ADD CONSTRAINT "stockUsers_Id_fkey" FOREIGN KEY (user_id) REFERENCES public.stock_users("Id") NOT VALID;


--
-- TOC entry 2889 (class 2606 OID 16455)
-- Name: portfolios user_id; Type: FK CONSTRAINT; Schema: public; Owner: stockAdmin
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.stock_users("Id") NOT VALID;


-- Completed on 2021-10-29 23:14:02

--
-- PostgreSQL database dump complete
--

