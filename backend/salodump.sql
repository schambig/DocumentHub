--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

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

--
-- Name: DocIdent; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DocIdent" AS ENUM (
    'DNI',
    'CARNETEXTRANJERIA',
    'PASAPORTE'
);


ALTER TYPE public."DocIdent" OWNER TO postgres;

--
-- Name: RolUsuario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RolUsuario" AS ENUM (
    'ADMIN',
    'DATAUSER',
    'USER'
);


ALTER TYPE public."RolUsuario" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: RelProdCate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RelProdCate" (
    "tablaProductoId" text NOT NULL,
    "tablaCategoriaId" text NOT NULL
);


ALTER TABLE public."RelProdCate" OWNER TO postgres;

--
-- Name: RelProdCateInver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RelProdCateInver" (
    "tablaProductoId" text NOT NULL,
    "tablaCategoriaId" text NOT NULL,
    "tablaInversionistaId" text NOT NULL
);


ALTER TABLE public."RelProdCateInver" OWNER TO postgres;

--
-- Name: RelProdInver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RelProdInver" (
    "tablaInversionistaId" text NOT NULL,
    "tablaProductoId" text NOT NULL
);


ALTER TABLE public."RelProdInver" OWNER TO postgres;

--
-- Name: TablaCategoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaCategoria" (
    id text NOT NULL,
    tipo character varying(40) NOT NULL
);


ALTER TABLE public."TablaCategoria" OWNER TO postgres;

--
-- Name: TablaDescarga; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaDescarga" (
    id text NOT NULL,
    "fechaDescarga" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "tablaUsuariosId" text NOT NULL,
    "tablaDocumentoId" text NOT NULL
);


ALTER TABLE public."TablaDescarga" OWNER TO postgres;

--
-- Name: TablaDocumento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaDocumento" (
    id text NOT NULL,
    "nombreFile" character varying(100) NOT NULL,
    "userSubida" character varying(100) NOT NULL,
    "fechaSubida" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "uuidAws" text NOT NULL,
    "urlAws" text NOT NULL,
    "tablaInversionistaId" text,
    "tablaProductoId" text,
    "tablaCategoriaId" text,
    "tablaTipoDocumentoId" text NOT NULL
);


ALTER TABLE public."TablaDocumento" OWNER TO postgres;

--
-- Name: TablaInversionista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaInversionista" (
    id text NOT NULL,
    nombres character varying(40) NOT NULL,
    "apPaterno" character varying(30) NOT NULL,
    "apMaterno" character varying(30) NOT NULL,
    "tipoIdentificacion" public."DocIdent" NOT NULL,
    "nroIdentificacion" character varying(20) NOT NULL,
    pep boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TablaInversionista" OWNER TO postgres;

--
-- Name: TablaProducto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaProducto" (
    id text NOT NULL,
    "codProducto" character varying(10) NOT NULL,
    "nombreProducto" character varying(50) NOT NULL
);


ALTER TABLE public."TablaProducto" OWNER TO postgres;

--
-- Name: TablaTipoDocumento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaTipoDocumento" (
    id text NOT NULL,
    nombre character varying(20) NOT NULL,
    descripcion character varying(100)
);


ALTER TABLE public."TablaTipoDocumento" OWNER TO postgres;

--
-- Name: TablaUsuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TablaUsuarios" (
    id text NOT NULL,
    "userNombre" character varying(100) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    rol public."RolUsuario" NOT NULL
);


ALTER TABLE public."TablaUsuarios" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: RelProdCate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RelProdCate" ("tablaProductoId", "tablaCategoriaId") FROM stdin;
clegjgo6q000talt3m25dy9c4	clegjgo7k002aalt3q6581y05
clegjgo6q0018alt3vxml2rs3	clegjgo7k002balt3tvas9to2
clegjgo6q000salt3ie0lo6dq	clegjgo7k002aalt3q6581y05
clegjgo6q000ualt3l7yxycas	clegjgo7k002galt3evk3mby2
clegjgo6q0018alt3vxml2rs3	clegjgo7k002halt3o04ob5ks
clegjgo6q000yalt35yd4si2d	clegjgo7k0027alt39jgauo33
clegjgo6q0010alt3mju4iv1t	clegjgo7k0026alt3itqw1fm6
clegjgo70001galt3oaz86y8d	clegjgo7k0026alt3itqw1fm6
clegjgo6q000yalt35yd4si2d	clegjgo7k002aalt3q6581y05
clegjgo70001lalt3ey5p28bw	clegjgo82003halt3s2dyez2o
clegjgo6q000yalt35yd4si2d	clegjgo7k002kalt3wlatyrdm
clegjgo6q0010alt3mju4iv1t	clegjgo7k0027alt39jgauo33
clegjgo70001galt3oaz86y8d	clegjgo7k002balt3tvas9to2
clegjgo6q000talt3m25dy9c4	clegjgo7k0027alt39jgauo33
clegjgo6q0016alt3tbll7rea	clegjgo7k0027alt39jgauo33
clegjgo6q0018alt3vxml2rs3	clegjgo7k002kalt3wlatyrdm
clegjgo6q000ualt3l7yxycas	clegjgo7k002aalt3q6581y05
clegjgo6q000ualt3l7yxycas	clegjgo7k002halt3o04ob5ks
clegjgo6q0014alt3pcqjfspa	clegjgo7k0027alt39jgauo33
\.


--
-- Data for Name: RelProdCateInver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RelProdCateInver" ("tablaProductoId", "tablaCategoriaId", "tablaInversionistaId") FROM stdin;
clegjgo6q000talt3m25dy9c4	clegjgo7k0027alt39jgauo33	clegjgo56000galt37fib5euv
clegjgo6q000talt3m25dy9c4	clegjgo7k002aalt3q6581y05	clegjgo54000ealt3pi81gii2
clegjgo6q0018alt3vxml2rs3	clegjgo7k002halt3o04ob5ks	clegjgo4s0002alt348tfxvqb
clegjgo6q0018alt3vxml2rs3	clegjgo7k002balt3tvas9to2	clegjgo54000ealt3pi81gii2
clegjgo6q000salt3ie0lo6dq	clegjgo7k002aalt3q6581y05	clegjgo4s0002alt348tfxvqb
clegjgo6q000ualt3l7yxycas	clegjgo7k002aalt3q6581y05	clegjgo56000galt37fib5euv
clegjgo6q0018alt3vxml2rs3	clegjgo7k002kalt3wlatyrdm	clegjgnzt0000alt36570szrm
clegjgo6q000yalt35yd4si2d	clegjgo7k0027alt39jgauo33	clegjgo4s0002alt348tfxvqb
clegjgo6q0010alt3mju4iv1t	clegjgo7k0026alt3itqw1fm6	clegjgnzt0000alt36570szrm
clegjgo6q0014alt3pcqjfspa	clegjgo7k0027alt39jgauo33	clegjgnzt0000alt36570szrm
clegjgo6q000yalt35yd4si2d	clegjgo7k002kalt3wlatyrdm	clegjgo53000aalt3fdmgfuvc
clegjgo70001galt3oaz86y8d	clegjgo7k0026alt3itqw1fm6	clegjgo53000aalt3fdmgfuvc
clegjgo6q000yalt35yd4si2d	clegjgo7k002aalt3q6581y05	clegjgo53000aalt3fdmgfuvc
clegjgo70001lalt3ey5p28bw	clegjgo82003halt3s2dyez2o	clegjgo56000galt37fib5euv
clegjgo70001galt3oaz86y8d	clegjgo7k002balt3tvas9to2	clegjgo53000aalt3fdmgfuvc
clegjgo6q0010alt3mju4iv1t	clegjgo7k0027alt39jgauo33	clegjgo54000ealt3pi81gii2
clegjgo6q0016alt3tbll7rea	clegjgo7k0027alt39jgauo33	clegjgnzt0000alt36570szrm
clegjgo6q000ualt3l7yxycas	clegjgo7k002halt3o04ob5ks	clegjgnzt0000alt36570szrm
clegjgo6q000ualt3l7yxycas	clegjgo7k002galt3evk3mby2	clegjgnzt0000alt36570szrm
clegjgo6q000salt3ie0lo6dq	clegjgo7k002aalt3q6581y05	clegjgo53000aalt3fdmgfuvc
\.


--
-- Data for Name: RelProdInver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RelProdInver" ("tablaInversionistaId", "tablaProductoId") FROM stdin;
clegjgo56000galt37fib5euv	clegjgo6q000talt3m25dy9c4
clegjgo4s0002alt348tfxvqb	clegjgo6q000yalt35yd4si2d
clegjgo53000aalt3fdmgfuvc	clegjgo70001galt3oaz86y8d
clegjgo53000aalt3fdmgfuvc	clegjgo6q000salt3ie0lo6dq
clegjgo53000aalt3fdmgfuvc	clegjgo6q000yalt35yd4si2d
clegjgnzt0000alt36570szrm	clegjgo6q0014alt3pcqjfspa
clegjgo54000ealt3pi81gii2	clegjgo6q0018alt3vxml2rs3
clegjgnzt0000alt36570szrm	clegjgo6q0016alt3tbll7rea
clegjgo4s0002alt348tfxvqb	clegjgo6q0018alt3vxml2rs3
clegjgo54000ealt3pi81gii2	clegjgo6q0010alt3mju4iv1t
clegjgo54000ealt3pi81gii2	clegjgo6q000talt3m25dy9c4
clegjgnzt0000alt36570szrm	clegjgo6q0010alt3mju4iv1t
clegjgnzt0000alt36570szrm	clegjgo6q0018alt3vxml2rs3
clegjgnzt0000alt36570szrm	clegjgo6q000ualt3l7yxycas
clegjgo56000galt37fib5euv	clegjgo6q000ualt3l7yxycas
clegjgo4s0002alt348tfxvqb	clegjgo6q000salt3ie0lo6dq
clegjgo56000galt37fib5euv	clegjgo70001lalt3ey5p28bw
\.


--
-- Data for Name: TablaCategoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaCategoria" (id, tipo) FROM stdin;
clegjgo7k0026alt3itqw1fm6	levantamiento#1
clegjgo7k002balt3tvas9to2	levantamiento#3
clegjgo7s002oalt349db9qek	levantamiento#10
clegjgo7s002palt3t2aikaup	levantamiento#11
clegjgo7x0035alt3xqarm7g4	levantamiento#20
clegjgo7x0030alt3y4v4sdmn	levantamiento#17
clegjgo82003dalt3bzcbswaj	emision#5
clegjgo82003oalt3kz82hm52	emision#11
clegjgo870045alt3u5jj69at	emision#17
clegjgo87003yalt3t0h31y5k	emision#13
clegjgo7k002aalt3q6581y05	levantamiento#4
clegjgo7x0036alt31ijw63xk	levantamiento#16
clegjgo84003ralt3fltuwt3w	emision#8
clegjgo8a0048alt3oyolvbt2	emision#20
clegjgo7k002galt3evk3mby2	levantamiento#6
clegjgo7x002ualt345stol9h	levantamiento#15
clegjgo82003halt3s2dyez2o	emision#6
clegjgo87003walt3awpj952t	emision#9
clegjgo7k0027alt39jgauo33	levantamiento#2
clegjgo7w002salt3nsvg0oba	levantamiento#12
clegjgo7z003aalt3b1lld4ax	emision#1
clegjgo84003qalt3v56j7d2a	emision#10
clegjgo8a004aalt3q8w1dhcw	emision#19
clegjgo7k002halt3o04ob5ks	levantamiento#7
clegjgo7x0031alt3jgyhohuw	levantamiento#18
clegjgo82003galt3cm3f9qrj	emision#4
clegjgo870044alt3b6ydefrf	emision#18
clegjgo7k002kalt3wlatyrdm	levantamiento#8
clegjgo7x002yalt35c9y9e18	levantamiento#13
clegjgo82003malt36l06oc3i	emision#3
clegjgo870042alt3odxdl90x	emision#16
clegjgo7k002ealt36yve7aoo	levantamiento#5
clegjgo7x0034alt3i3gsed4b	levantamiento#19
clegjgo82003kalt3rikbfv88	emision#7
clegjgo87003ualt3ow554hc5	emision#14
clegjgo8c004calt3bzegpg8n	emision#12
clegjgo7k002lalt3u6oiw0tv	levantamiento#9
clegjgo7x002valt32oji43jv	levantamiento#14
clegjgo82003calt3msw1acbe	emision#2
clegjgo87003valt358rrb5gf	emision#15
\.


--
-- Data for Name: TablaDescarga; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaDescarga" (id, "fechaDescarga", "tablaUsuariosId", "tablaDocumentoId") FROM stdin;
\.


--
-- Data for Name: TablaDocumento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaDocumento" (id, "nombreFile", "userSubida", "fechaSubida", "uuidAws", "urlAws", "tablaInversionistaId", "tablaProductoId", "tablaCategoriaId", "tablaTipoDocumentoId") FROM stdin;
clehn2jn20008aldbj8uk2kvy	A.L1.2	AutoLogin	2023-02-23 21:51:13.646	A.L1.2.0	url5	clegjgnzt0000alt36570szrm	clegjgo6q000ualt3l7yxycas	clegjgo7k002galt3evk3mby2	clegjgo8r004palt3j2f44a9t
clehn2jnl000oaldbmo61jnxz	B.L4.2	AutoLogin	2023-02-23 21:51:13.647	B.L4.2.0	url10	clegjgo53000aalt3fdmgfuvc	clegjgo6q000yalt35yd4si2d	clegjgo7k002kalt3wlatyrdm	clegjgo8r004palt3j2f44a9t
clehn2jn2000aaldbnr43wmad	A.L4.2 - excel	AutoLogin	2023-02-23 21:51:13.646	A.L4.2.0	url4	clegjgo54000ealt3pi81gii2	clegjgo6q000talt3m25dy9c4	clegjgo7k002aalt3q6581y05	clegjgo8r004palt3j2f44a9t
clehn2jnl000naldbomx9hd4x	C.L2.6 - jpg	AutoLogin	2023-02-23 21:51:13.647	C.L2.6.0	url16	clegjgo53000aalt3fdmgfuvc	clegjgo70001galt3oaz86y8d	clegjgo7k0026alt3itqw1fm6	clegjgo8r004palt3j2f44a9t
clehn2jn10006aldbvi8ei218	B.L2.3 - pdf share	AutoLogin	2023-02-23 21:51:13.646	B.L2.3.0	url8	clegjgnzt0000alt36570szrm	clegjgo6q0014alt3pcqjfspa	clegjgo7k0027alt39jgauo33	clegjgo8r004palt3j2f44a9t
clehn2jnk000ealdbld75ngnb	B.L3.2	AutoLogin	2023-02-23 21:51:13.647	B.L3.2.0	url9	clegjgo56000galt37fib5euv	clegjgo6q000ualt3l7yxycas	clegjgo7k002aalt3q6581y05	clegjgo8r004palt3j2f44a9t
clehn2jnt000qaldb4nvdcghd	C.L3.3	AutoLogin	2023-02-23 21:51:13.647	C.L3.3.0	url19	clegjgnzt0000alt36570szrm	clegjgo6q000ualt3l7yxycas	clegjgo7k002halt3o04ob5ks	clegjgo8r004palt3j2f44a9t
clehn2jn2000daldbla0viatt	B.L3.4	AutoLogin	2023-02-23 21:51:13.647	B.L3.4.0	url12	clegjgo56000galt37fib5euv	clegjgo6q000talt3m25dy9c4	clegjgo7k0027alt39jgauo33	clegjgo8r004palt3j2f44a9t
clehn2jnl000laldbyx2wqftj	C.L2.1	AutoLogin	2023-02-23 21:51:13.647	C.L2.1.0	url17	clegjgo4s0002alt348tfxvqb	clegjgo6q000yalt35yd4si2d	clegjgo7k0027alt39jgauo33	clegjgo8r004palt3j2f44a9t
clehn2jn2000baldbtxy0j2vm	B.L1.4 - excel2	AutoLogin	2023-02-23 21:51:13.646	B.L1.4.0	url7	clegjgnzt0000alt36570szrm	clegjgo6q0016alt3tbll7rea	clegjgo7k0027alt39jgauo33	clegjgo8r004palt3j2f44a9t
clehn2jnl000haldbwgjefrlw	B.L3.8 - excel export	AutoLogin	2023-02-23 21:51:13.647	B.L3.8.0	url11	clegjgo54000ealt3pi81gii2	clegjgo6q0010alt3mju4iv1t	clegjgo7k0027alt39jgauo33	clegjgo8r004palt3j2f44a9t
clehn2jn10005aldbvyaa7snw	A.L1.1	AutoLogin	2023-02-23 21:51:13.645	A.L1.1.0	url1	clegjgo4s0002alt348tfxvqb	clegjgo6q0018alt3vxml2rs3	clegjgo7k002halt3o04ob5ks	clegjgo8r004palt3j2f44a9t
clehn2jnl000ialdbl1rl8jb1	C.L1.5 - excel folder, doc share	AutoLogin	2023-02-23 21:51:13.647	C.L1.5.0	url15	clegjgo4s0002alt348tfxvqb	clegjgo6q000salt3ie0lo6dq	clegjgo7k002aalt3q6581y05	clegjgo8r004palt3j2f44a9t
clehn2jnu000waldbuqhsztbp	F.10	AutoLogin	2023-02-23 21:51:13.647	F.10.0	urlficha10	clegjgo6e000kalt31k7yk0vk	\N	\N	clegjgo8r004ualt3hobdatka
clehn2jn10000aldbeacnog6f	A.L1.5	AutoLogin	2023-02-23 21:51:13.646	A.L1.5.0	url6	clegjgo56000galt37fib5euv	clegjgo70001lalt3ey5p28bw	clegjgo82003halt3s2dyez2o	clegjgo8r004palt3j2f44a9t
clehn2jnl000maldb0mfahfs2	C.L3.8	AutoLogin	2023-02-23 21:51:13.647	C.L3.8.0	url18	clegjgo53000aalt3fdmgfuvc	clegjgo70001galt3oaz86y8d	clegjgo7k002balt3tvas9to2	clegjgo8r004palt3j2f44a9t
clehn2jnu000valdble6oeav5	F.9	AutoLogin	2023-02-23 21:51:13.647	F.9.0	urlficha9	clegjgo4z0006alt3xh25uev1	\N	\N	clegjgo8r004ualt3hobdatka
clehn2jn20009aldbecpkd0i0	A.L2.1	AutoLogin	2023-02-23 21:51:13.645	A.L2.1.0	url2	clegjgnzt0000alt36570szrm	clegjgo6q0010alt3mju4iv1t	clegjgo7k0026alt3itqw1fm6	clegjgo8r004palt3j2f44a9t
clehn2jnl000jaldb91v9ji2d	B.L3.1	AutoLogin	2023-02-23 21:51:13.647	B.L3.1.0	url13	clegjgo53000aalt3fdmgfuvc	clegjgo6q000yalt35yd4si2d	clegjgo7k002aalt3q6581y05	clegjgo8r004palt3j2f44a9t
clehn2jnu000taldbrs6o1s1h	F.12	AutoLogin	2023-02-23 21:51:13.647	F.12.0	urlficha12	clegjgo6f000nalt3nnmae4bl	\N	\N	clegjgo8r004ualt3hobdatka
clehn2jn20007aldb0k8v1awq	A.L3.1	AutoLogin	2023-02-23 21:51:13.646	A.L3.1.0	url3	clegjgo53000aalt3fdmgfuvc	clegjgo6q000salt3ie0lo6dq	clegjgo7k002aalt3q6581y05	clegjgo8r004palt3j2f44a9t
clehn2jnk000faldba4c0gz0k	B.L3.7	AutoLogin	2023-02-23 21:51:13.647	B.L3.7.0	url14	clegjgo54000ealt3pi81gii2	clegjgo6q0018alt3vxml2rs3	clegjgo7k002balt3tvas9to2	clegjgo8r004palt3j2f44a9t
clehn2jnt000paldbitu6vg9k	D.L1.2	AutoLogin	2023-02-23 21:51:13.647	D.L1.2.0	url20	clegjgnzt0000alt36570szrm	clegjgo6q0018alt3vxml2rs3	clegjgo7k002kalt3wlatyrdm	clegjgo8r004palt3j2f44a9t
\.


--
-- Data for Name: TablaInversionista; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaInversionista" (id, nombres, "apPaterno", "apMaterno", "tipoIdentificacion", "nroIdentificacion", pep) FROM stdin;
clegjgo4s0002alt348tfxvqb	Luis Antonio	Velasco	Marcelo	CARNETEXTRANJERIA	947032556	f
clegjgo69000ialt3m6p3tl87	Sebastian Alejandro	Suluja	Arbulu	DNI	665544330	f
clegjgo4z0006alt3xh25uev1	Alfredo Antonio	Portella	Valdez	DNI	998877660	f
clegjgo6e000kalt31k7yk0vk	Jose Carlos	Tremolada	Lam	DNI	223344550	t
clegjgo54000calt3q0tl8yfp	Oscar Rodolfo	Picasso	Jara	PASAPORTE	987123654	t
clegjgo53000aalt3fdmgfuvc	Rodrigo Alessandro	De Luzio	Poquioma	DNI	908060154	t
clegjgo6f000nalt3nnmae4bl	Maria Begona	Aspillaga	Massa	DNI	998844550	t
clegjgo54000ealt3pi81gii2	Mardely del Rosario	Alfaro	Stanic	DNI	947071556	t
clegjgo500007alt3ze935h54	Nataly	Guanilo	Casabonne	DNI	987654321	f
clegjgo56000galt37fib5euv	Elisa Pamela	Luque	Calderon	CARNETEXTRANJERIA	917051362	t
clegjgo6f000qalt3wt6rk2gy	Edu	Ramos	Maldonado	DNI	987123654	t
clegjgo4y0004alt3rdj9mvww	Ericka Sofia	Rossi de Malaga	Flores	DNI	654987321	f
clegjgo6f000malt3uqlewz3q	Renato Eduardo	Herbozo	Hoyos	DNI	664455770	f
clegjgnzt0000alt36570szrm	Juan Manuel	Villa	Rushton	PASAPORTE	908070456	t
\.


--
-- Data for Name: TablaProducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaProducto" (id, "codProducto", "nombreProducto") FROM stdin;
clegjgo6q000zalt3yg3zz88x	B-PRD	Bonos Corporativos Praedium
clegjgo70001ealt3qp7dfx67	B-TDR-A	Bono TRD Artline
clegjgo74001xalt34wn7hkl5	FSPEVC	FSPEVC
clegjgo6q000talt3m25dy9c4	FEC-RF	Fondo Edifica Core - Renta Fija
clegjgo6q000yalt35yd4si2d	PRD	Fondo Praedium
clegjgo6q0016alt3tbll7rea	FSC	Fondo Seguridad Core
clegjgo6q0010alt3mju4iv1t	TLR	Fondo TLR
clegjgo6q000salt3ie0lo6dq	FDF	Fondo de Derivados Financieros
clegjgo6q0014alt3pcqjfspa	PFM	Fondo Performance
clegjgo6q0018alt3vxml2rs3	FEC	Fondo Edifica Core
clegjgo6x001balt3aa6fika9	B-FECII	Bono FEC II
clegjgo6x001aalt3ujgqqcu0	PC-FECII	Papeles Comerciales - FEC II
clegjgo70001galt3oaz86y8d	FEQ	Fondo Equilibrio
clegjgo70001qalt3tsiwsar7	FEG	Fondo Edifica Global
clegjgo70001jalt3w0pap82f	FOP	Fondo Oportunidad
clegjgo70001malt3o78r1kls	FDI-1A	FDI 1A
clegjgo72001talt3mbmof3mz	FEV	Fondo Edifica V
clegjgo72001salt3zy6csjyq	FSPD	FSPD
clegjgo74001walt3y60z9z69	FSGOP	FSGOP
clegjgo740023alt3s91oijdo	FIRE	FIRE
clegjgo740020alt36zeb1pxa	FSRE	Fondo Sabbi Real Estate
clegjgo74001yalt3szzgcqcb	GO	BSGOP
clegjgo70001falt3bahm6jut	FDI-1B	FDI 1B
clegjgo6q000ualt3l7yxycas	FECII	Fondo Edifica Core II
clegjgo70001lalt3ey5p28bw	B-USA	Bono USA
\.


--
-- Data for Name: TablaTipoDocumento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaTipoDocumento" (id, nombre, descripcion) FROM stdin;
clegjgo8r004salt3qvcwtt0t	Anexo 2	\N
clegjgo8r004palt3j2f44a9t	Contrato	\N
clegjgo8r004ualt3hobdatka	Ficha Cliente	\N
clegjgo8r004oalt3lhyfrnci	Anexo 1	\N
\.


--
-- Data for Name: TablaUsuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TablaUsuarios" (id, "userNombre", email, password, estado, rol) FROM stdin;
clegjgo8h004jalt3n2w5fngx	readuserf	r2user@gmail.com	psr2	f	USER
clegjgo8h004ealt3no4j7rao	administrator	admin@gmail.com	psadmin	t	ADMIN
clegjgo8h004malt3snnd7ch3	LibreTest	admin1@gmail.com	psadmin1	t	ADMIN
clegjgo8h004ialt359yvgkmk	readuser	r1user@gmail.com	psr1	t	USER
clegjgo8h004falt3w6cvf59c	readwriteuser	rwuser@gmail.com	psrwu	t	DATAUSER
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8c2683c5-8fd1-4e8c-b0b8-19686488d743	2f8b2ff655098e5005c0cb7c9ee067e2ff539fa4da40413135427321d97e6c02	2023-02-21 14:33:12.617227-05	20230221193312_code_db	\N	\N	2023-02-21 14:33:12.412732-05	1
cddf2af4-4df3-4023-861f-ced2576db852	2ef370fa5d77bb291217269963764f07cebc2461529b426509a7b0dfc1c77396	2023-02-22 15:19:46.963733-05	20230222201946_code_db_1	\N	\N	2023-02-22 15:19:46.80604-05	1
4dc42bc7-10a4-4867-ac25-997954aa72a3	5041cc7a9765c675f93c3a6d838f591f5c40932178f637b5d2539c80454f27a7	2023-02-22 16:04:26.616596-05	20230222210426_code_db_2	\N	\N	2023-02-22 16:04:26.604346-05	1
\.


--
-- Name: RelProdCateInver RelProdCateInver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCateInver"
    ADD CONSTRAINT "RelProdCateInver_pkey" PRIMARY KEY ("tablaProductoId", "tablaCategoriaId", "tablaInversionistaId");


--
-- Name: RelProdCate RelProdCate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCate"
    ADD CONSTRAINT "RelProdCate_pkey" PRIMARY KEY ("tablaProductoId", "tablaCategoriaId");


--
-- Name: RelProdInver RelProdInver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdInver"
    ADD CONSTRAINT "RelProdInver_pkey" PRIMARY KEY ("tablaInversionistaId", "tablaProductoId");


--
-- Name: TablaCategoria TablaCategoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaCategoria"
    ADD CONSTRAINT "TablaCategoria_pkey" PRIMARY KEY (id);


--
-- Name: TablaDescarga TablaDescarga_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDescarga"
    ADD CONSTRAINT "TablaDescarga_pkey" PRIMARY KEY (id);


--
-- Name: TablaDocumento TablaDocumento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDocumento"
    ADD CONSTRAINT "TablaDocumento_pkey" PRIMARY KEY (id);


--
-- Name: TablaInversionista TablaInversionista_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaInversionista"
    ADD CONSTRAINT "TablaInversionista_pkey" PRIMARY KEY (id);


--
-- Name: TablaProducto TablaProducto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaProducto"
    ADD CONSTRAINT "TablaProducto_pkey" PRIMARY KEY (id);


--
-- Name: TablaTipoDocumento TablaTipoDocumento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaTipoDocumento"
    ADD CONSTRAINT "TablaTipoDocumento_pkey" PRIMARY KEY (id);


--
-- Name: TablaUsuarios TablaUsuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaUsuarios"
    ADD CONSTRAINT "TablaUsuarios_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: TablaUsuarios_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TablaUsuarios_email_key" ON public."TablaUsuarios" USING btree (email);


--
-- Name: RelProdCateInver RelProdCateInver_tablaCategoriaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCateInver"
    ADD CONSTRAINT "RelProdCateInver_tablaCategoriaId_fkey" FOREIGN KEY ("tablaCategoriaId") REFERENCES public."TablaCategoria"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelProdCateInver RelProdCateInver_tablaInversionistaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCateInver"
    ADD CONSTRAINT "RelProdCateInver_tablaInversionistaId_fkey" FOREIGN KEY ("tablaInversionistaId") REFERENCES public."TablaInversionista"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelProdCateInver RelProdCateInver_tablaProductoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCateInver"
    ADD CONSTRAINT "RelProdCateInver_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES public."TablaProducto"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelProdCate RelProdCate_tablaCategoriaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCate"
    ADD CONSTRAINT "RelProdCate_tablaCategoriaId_fkey" FOREIGN KEY ("tablaCategoriaId") REFERENCES public."TablaCategoria"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelProdCate RelProdCate_tablaProductoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdCate"
    ADD CONSTRAINT "RelProdCate_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES public."TablaProducto"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelProdInver RelProdInver_tablaInversionistaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdInver"
    ADD CONSTRAINT "RelProdInver_tablaInversionistaId_fkey" FOREIGN KEY ("tablaInversionistaId") REFERENCES public."TablaInversionista"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelProdInver RelProdInver_tablaProductoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RelProdInver"
    ADD CONSTRAINT "RelProdInver_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES public."TablaProducto"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TablaDescarga TablaDescarga_tablaDocumentoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDescarga"
    ADD CONSTRAINT "TablaDescarga_tablaDocumentoId_fkey" FOREIGN KEY ("tablaDocumentoId") REFERENCES public."TablaDocumento"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TablaDescarga TablaDescarga_tablaUsuariosId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDescarga"
    ADD CONSTRAINT "TablaDescarga_tablaUsuariosId_fkey" FOREIGN KEY ("tablaUsuariosId") REFERENCES public."TablaUsuarios"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TablaDocumento TablaDocumento_tablaCategoriaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDocumento"
    ADD CONSTRAINT "TablaDocumento_tablaCategoriaId_fkey" FOREIGN KEY ("tablaCategoriaId") REFERENCES public."TablaCategoria"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TablaDocumento TablaDocumento_tablaInversionistaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDocumento"
    ADD CONSTRAINT "TablaDocumento_tablaInversionistaId_fkey" FOREIGN KEY ("tablaInversionistaId") REFERENCES public."TablaInversionista"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TablaDocumento TablaDocumento_tablaProductoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDocumento"
    ADD CONSTRAINT "TablaDocumento_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES public."TablaProducto"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TablaDocumento TablaDocumento_tablaTipoDocumentoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TablaDocumento"
    ADD CONSTRAINT "TablaDocumento_tablaTipoDocumentoId_fkey" FOREIGN KEY ("tablaTipoDocumentoId") REFERENCES public."TablaTipoDocumento"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

