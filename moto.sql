PGDMP                         z            moto    14.1    14.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    49265    moto    DATABASE     `   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    49266    changes    TABLE     J   CREATE TABLE public.changes (
    todos bigint,
    "doneTodos" bigint
);
    DROP TABLE public.changes;
       public         heap    postgres    false            �            1259    49269    fcms    TABLE     �   CREATE TABLE public.fcms (
    id integer NOT NULL,
    token character varying,
    "updatedAt" time with time zone,
    "createdAt" time with time zone
);
    DROP TABLE public.fcms;
       public         heap    postgres    false            �            1259    49274 
   fcm_id_seq    SEQUENCE     �   ALTER TABLE public.fcms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fcm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    49275    logs    TABLE     �  CREATE TABLE public.logs (
    id integer NOT NULL,
    type character varying,
    info text,
    who character varying,
    whom character varying,
    did character varying,
    details text,
    link character varying,
    date date,
    "time" time without time zone,
    "updatedAt" timestamp without time zone,
    "createdAt" timestamp without time zone,
    success boolean,
    "todoId" integer,
    todo_internal_id character varying
);
    DROP TABLE public.logs;
       public         heap    postgres    false            �            1259    49280    logs_id_seq    SEQUENCE     �   ALTER TABLE public.logs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    49281    todos    TABLE       CREATE TABLE public.todos (
    id integer NOT NULL,
    part character varying,
    indexx character varying,
    quantity character varying,
    price character varying,
    band_number character varying,
    note text,
    collect_date date,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    company character varying,
    condition character varying,
    done boolean,
    "whoDone" character varying,
    "whoAdd" character varying,
    "whoRestored" character varying,
    deposit boolean,
    time_morning boolean,
    internal_id character varying,
    fv boolean,
    active boolean
);
    DROP TABLE public.todos;
       public         heap    postgres    false            �            1259    49286    todo_id_seq    SEQUENCE     �   ALTER TABLE public.todos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    49287    updates    TABLE     �   CREATE TABLE public.updates (
    id integer NOT NULL,
    wersja real,
    url character varying,
    "createdAt" date,
    "updatedAt" date,
    actual boolean,
    name character varying
);
    DROP TABLE public.updates;
       public         heap    postgres    false            �            1259    49292    updates_id_seq    SEQUENCE     �   ALTER TABLE public.updates ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.updates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    49293    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying,
    lastname character varying,
    username character varying,
    "isAdmin" boolean,
    "isEditor" boolean,
    "isViewer" boolean,
    "accessToken" character varying,
    "refreshToken" character varying,
    password character varying,
    "createdAt" date,
    "updatedAt" date,
    active boolean
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    49298    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220                      0    49266    changes 
   TABLE DATA           5   COPY public.changes (todos, "doneTodos") FROM stdin;
    public          postgres    false    211                    0    49269    fcms 
   TABLE DATA           C   COPY public.fcms (id, token, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    212   $                 0    49275    logs 
   TABLE DATA           �   COPY public.logs (id, type, info, who, whom, did, details, link, date, "time", "updatedAt", "createdAt", success, "todoId", todo_internal_id) FROM stdin;
    public          postgres    false    214   l                  0    49281    todos 
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone", "whoAdd", "whoRestored", deposit, time_morning, internal_id, fv, active) FROM stdin;
    public          postgres    false    216   �,                 0    49287    updates 
   TABLE DATA           Z   COPY public.updates (id, wersja, url, "createdAt", "updatedAt", actual, name) FROM stdin;
    public          postgres    false    218   �.       
          0    49293    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt", active) FROM stdin;
    public          postgres    false    220   /                  0    0 
   fcm_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.fcm_id_seq', 1, true);
          public          postgres    false    213                       0    0    logs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.logs_id_seq', 97, true);
          public          postgres    false    215                       0    0    todo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.todo_id_seq', 220, true);
          public          postgres    false    217                       0    0    updates_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.updates_id_seq', 59, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 34, true);
          public          postgres    false    221                  x������ � �         8  x���[n�@ @�o��K���(bb�0B��FX}��&����\�H��ohS��[)��ΛO�S Hi���5�S��
�?�VR[J��TW�MT���ҎB���-1�ր�\�K��,Q�ڣm$�c#�	E9���O���펺2�!�НW}7 ֕]�{���6Y��8;1���B��W3����s}�_V]�g�����2�h���/�����mA1&�*:ݾf4�eG�0�JZm�n��9�c[:���Ƭ�v�Pw9>�����U��`�hӄ"�����zIh^��~N/+�G_�ַ���0�/T-K�         ;  x�՜ߎ۸��=OA��aER(E�n
��m
,�7� �ƒe<��c�3S��}� ����5�^=�D��I۲��m0Hf>it���<��ɲy�l�*'�^Nn�ռ��w�y{����>̐��EJ���'�e$�Xb0�?o����=�:�(��H�)�am��i�f��F�Qy���i=�����#]sm=:�:Ϣ���4��Jsm=>�z��;�q��"�k���֓I���@@�Ü�^���a����+,~���o�f���'��oϵu�c>=Y�f:�i�ýqr��Bj[��8�yo�:�ic6�WN
�Hf,��H��0�����cAk�f��d8w�Ҽ7�`�Ȑ&Y0Hc�p0tk�{��hp����Ǣ.�����Cc�W�m����P�h�p�a��^�{�/�Mj��b�P�}I/�K�,��6�7RQ��}�\���~k�v�3���r)o��$ğ�C�a�F^�{C/�^�x�2id0��yy���7��&���M0��������%�Y���$R�q��7�E�1�_e��r�ć{_���ж�4�;����z�Z��V`��fȱlH5�����6?�6�$A� �c�!�@�rm;���w��z�������7Ͷ�nP�ڬ����f<�b����C�m�s������\���m�V9�]�U>���պY=[�6�=/n�Z~��`�{�=�v&b�ƎA���\ig�2r�0��]��,��Z��a��ڸ��<�8$Rh��{�6�]�g<ڈ`���qJsmܻ�=���uc��	�A��\��ֵG�4�bm$Lq�P/�����h��F{@wM��?��qԐ�yQ��B�b8Lb/_(�O��mXX��nmt�}��:^�1�PcI�J��2"扟k��ڶ-\2LB���6�KM�L^�4h�c^/���|�a��"Cd�揟?>}���]�˛|��-���C��jn�� �u���jV�~�����ɼ�a���_6��W"!0jϛ�;�L��|�֖��(߿�(���m�z]����EU�ܾ��e��Y���u^����u�����n֥x4�+뼾����r�~J�wal]��|���C��g��e]ݖ�o�U]�o[��~7�K]~�}Q��jy�۪�%���a��T�` ��\�`�Zd�ٓ���H1s?׶I�=��3X��7�M���{}��%W\��(h��0	B/׾Q�����.h�&C,ж�b( ����<[����z���O�b�AcΦ]�N��L��l*r~��
?��
 �~T�:���r	w�T��"WᲑ� ![��t��W�:f��}G^�.�9$��J������w�.���{�msW8o�{���pJ���h�`��t��y!n��������2��z�g3;�W��J�Y�����UӶ]�f�R���)x����?��ؽk_��v:�/Vs��N.X��j]+\������F��(Ȉ�w$�)��{�u�bm���n��}�ij1K�)���%t0�o�8}���|0���	������9�����v��ϫ~�n<�w���F����<�z���ԟ��ı�}��c���T,X�е��$$^�}��g�!��9T�o�acMl��D<G���w��v�8\�	�`�-8���t��w:�t�p�:��8����S�t
9Y��&�Z��b)����9�u������ʕ�����'Ϻ(������J�>�1Ly��GD�����}U�O��po��ؿ��N`ݖG[��=��c�<�\{�l�Ӑb�%��k��D�_�5�S�nz��`��9I���q��]tv3�#Zs-�����š����Li�P)�jl5��؋�F~��%!b��>V2���ݹ���2o|e���(w��W?`6����h7�T�Ȋ�d��]�yw����7'iF�����C�-G�r�jV��=}��c!�!�PM7-��jfM,z�m8��g���ボ��ƄXΙ.��d� �;<������B�bQ�8rl�� pD"����b�/T��-O=��NU{���M�H�_�K�d80�h���'��l����M���(Lq�.�`γ���V/���'w�mL�IC�Ag��\nq0�<��}����N�N,�����V�d����E��	x|�S�C����J�h���!�����tl�Ƒ�8v��j!3yЁ��a�������[.�P�ơ
��bOګ���_?MN-|��H���B���W���?j�ҿLS�&��:�Cc/�����E?�8�
 Q���rc���������)4:Zh�Z��Bh$�.���SU��Y�U����4�s��M�������)2t�d1ǱKd˅�P�l2����p}Q��Sg���J�S�@�r�3���W����B�����:y{��I��]6]Z'9���uF=���;�R�芉�.������%�GkM���|=O꼾J�E�O�E[ե�|E�+uei�]�m_Ѐ��U��W�����ʽ�ġ$�Q�R�r�VN�u�/mk@�%�:��fЎk��w��E��^�{Lrd/qɢ8S/�<z�gwD:W4�����GQ�1�i����/�<��xЋ�>���O#GO�x_Wp��=�o�M{���G�Qd��-����/���hrX��� �1�D������WV�U�z�Ǯ~<r���%��>�_[}��7�c!D��q����~!���_�⢪���űKy�����.�-7��|���K7vr��;5�;�q̸koy�S�GWb�=������ܕ��O���[n��q~���bQ,r�d8<�<�<ޞ��?�m����Uc�W���1u|�9p��: �<�-���}+���ww�dx���������d�Z"��u}�A0���C��@�8�5<P����ӯ4%C�� 	�\�fKO=�t���Q!�2�5��9�d~��>�twԱ�^r�1bK�?��Z��a*i��`��Z��J�\[�n��>�20m��d0�s/צO��i����ji���v8�H�ήa��{��LZ���U8МL��>c���b8��k�����@�a�%���,J�Á��׶O����z��mH��rm�ģe�I���OaI����?�+ۯ����� ?�         �  x���M��0���)r ��$;��e�,X���&�+ma�a���*l{/��G����&}���,�I �����`�<WnN|uE��
ac��*�mxD�� ��7ݦ{�>�M{x��6ݪ:|�.ޞ߆U���3&=p���t	�F��뇯L����m ����ב����H��[r��-@5X;p�}�n?�L������$�l�H�խ���%��؉��n�'�����t��i١Q����ʔ��Y�,�U��ʎ�J��Viljzv��^_X����~��4#�rp߽_y �8���!L�r{�^��f����i�ėV:�
�����|�22�fy;臝�<m����~����h�)�2*���U�R%gah.:�>�*)3r�&YO���\�E���dI.`䬍��0��"�3�s������ŧ��.yĒ���<��եZ�hܕ���XR*��qi�",����a��l6�	k*��         e   x�u̽
� @�Y��^���K45IBe�X�O�I�v�ç=#�L
)Ax 5��A8��)�4���6O�{�ݣ��B�,��K���τ���z�9�7�=!]      
     x��Ɏ�H���s����#�6`�f�Z�0��c��s���{M����]�#��ճH)�!����FC��N|hu2�)��%����]W4(�~dz�țQF�Ln��$^��œk�
��� �+9?:�g���AE�{gs=|���,p�*�V����
2q�~�=8{�rQՅ��8Fzv�a�֌84�lZ&�j����ʜ�9aMཱྀ�,�	�?��'�g�"����ˁd"�"�:;���DO���{ɚ�#.J{�� ��_��à��w	���	�}OhTsqԄ�8ikץs&�R���1�,�i&����=w�x��0�:�ů!�#��Q-�_6E�/a{C֫���Mؒpz��2>uĪ�-.�H�����%���RD�0x�My�
H������DA����ʍ6|���s�l�+O�kdz.b��^@@~
�/�n�!�����;f�W&���]RE�V�|��1�7b1�u�S�&��Gj��_�(�eE�B;���j�]�R�fu`�i%-���S��J8�cq�צ��꿃G��u0�k����T����fT���e3h[��BtO_vl�S������<�钻�����ṷ��`q'��G/Zt{���K�B�(�����L���J�4�����G�h=�n��V�'�~\9v��g*4V��v��}�������~{���i��&�zC��Hl2;�x����qZ�+~�llϛg&<����D3~�HH�OAvU{���P����Z��\%���n^��o3����b��CU!�5`��Qf��5�*'��F���"t@�)�K��ի�����z̉8<jG���u�e�z�ᄈl�>�N�0�j%���GlE_�����?	'��>�Px}��~�9���S�r�����H�M4�\��+�9{#������Y��v)��UK�귁��y�0gϯ'|іJ��h��t��}ۢ�h�9ՄOM�̆�����m�Y�S��N��qv�N߶�ݮ�Z�|�~�XJ     