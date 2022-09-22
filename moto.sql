PGDMP          !                z           moto    14.2    14.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    moto    DATABASE     `   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    16441    changes    TABLE     J   CREATE TABLE public.changes (
    todos bigint,
    "doneTodos" bigint
);
    DROP TABLE public.changes;
       public         heap    postgres    false            �            1259    16395    fcms    TABLE     �   CREATE TABLE public.fcms (
    id integer NOT NULL,
    token character varying,
    "updatedAt" time with time zone,
    "createdAt" time with time zone
);
    DROP TABLE public.fcms;
       public         heap    postgres    false            �            1259    16400 
   fcm_id_seq    SEQUENCE     �   ALTER TABLE public.fcms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fcm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            �            1259    16422    logs    TABLE     �  CREATE TABLE public.logs (
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
    "todoId" integer
);
    DROP TABLE public.logs;
       public         heap    postgres    false            �            1259    16425    logs_id_seq    SEQUENCE     �   ALTER TABLE public.logs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16401    todos    TABLE     k  CREATE TABLE public.todos (
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
    fv boolean
);
    DROP TABLE public.todos;
       public         heap    postgres    false            �            1259    16406    todo_id_seq    SEQUENCE     �   ALTER TABLE public.todos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            �            1259    16413    updates    TABLE     �   CREATE TABLE public.updates (
    id integer NOT NULL,
    wersja real,
    url character varying,
    "createdAt" date,
    "updatedAt" date,
    actual boolean,
    name character varying
);
    DROP TABLE public.updates;
       public         heap    postgres    false            �            1259    16416    updates_id_seq    SEQUENCE     �   ALTER TABLE public.updates ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.updates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16407    users    TABLE     �  CREATE TABLE public.users (
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
       public         heap    postgres    false            �            1259    16412    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215                      0    16441    changes 
   TABLE DATA           5   COPY public.changes (todos, "doneTodos") FROM stdin;
    public          postgres    false    221   �                 0    16395    fcms 
   TABLE DATA           C   COPY public.fcms (id, token, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    211   �       	          0    16422    logs 
   TABLE DATA           �   COPY public.logs (id, type, info, who, whom, did, details, link, date, "time", "updatedAt", "createdAt", success, "todoId") FROM stdin;
    public          postgres    false    219                     0    16401    todos 
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone", "whoAdd", "whoRestored", deposit, time_morning, internal_id, fv) FROM stdin;
    public          postgres    false    213   `'                 0    16413    updates 
   TABLE DATA           Z   COPY public.updates (id, wersja, url, "createdAt", "updatedAt", actual, name) FROM stdin;
    public          postgres    false    217   K)                 0    16407    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt", active) FROM stdin;
    public          postgres    false    215   �)                  0    0 
   fcm_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.fcm_id_seq', 1, true);
          public          postgres    false    212                       0    0    logs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.logs_id_seq', 53, true);
          public          postgres    false    220                       0    0    todo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.todo_id_seq', 219, true);
          public          postgres    false    214                       0    0    updates_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.updates_id_seq', 59, true);
          public          postgres    false    218                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 33, true);
          public          postgres    false    216                  x������ � �         8  x���[n�@ @�o��K���(bb�0B��FX}��&����\�H��ohS��[)��ΛO�S Hi���5�S��
�?�VR[J��TW�MT���ҎB���-1�ր�\�K��,Q�ڣm$�c#�	E9���O���펺2�!�НW}7 ֕]�{���6Y��8;1���B��W3����s}�_V]�g�����2�h���/�����mA1&�*:ݾf4�eG�0�JZm�n��9�c[:���Ƭ�v�Pw9>�����U��`�hӄ"�����zIh^��~N/+�G_�ַ���0�/T-K�      	   :  x���ˎ�6���S^{X�ԕEQI�6iS�H7A����$�mq*�q좋(�A���:�^=�Ȗ(sf|	��GZ��sxB3�V�Ҳ�o^�i5)J��&�w�Т��̑��C=J/�����8I8�Z5{���'�i���AhI(�)sa-�N��Q[A2$��ki�D逓ؖ�{q/�-�����1z�I���gi˵tx�t��^t��0�MĖk��h�h���'0�-��c�8��6���!�Ï��09�i���Z��Qb;�q-M�S�����a��er�r#iKH=G[n��aD؁��/v�9�þ9��>�ڵ6��=u����y�r�}|�Gj$#�u2�a��z�p�ݮ���O���2G����'�2�7bU���
�U���j���ɍ���V+��	uac$9����S�1���b�a�|'7[�wF+���=IK٘8��B�e%@������P�0I'7V虬�
φ-�-��cƜ�Xa��K+~�[�$C�sac�?��DeJ���P�p�Nn�g��>�6���D.l�8֮�C�r��`�L��V��S�c���X��	юxǵp|�0��3H��P� 2��Z8T��|QW��}:X�����bUS�=�e��f[Y�1E/$���`m5٬'�AE���c$��J�w^��G�eE-���Z�c�$���5Ѫ�z{gr���aP_������(�Zw6�}�>����,ñ:�Vv����
��$��\+;o��Sw����dp�9�r�켊>��P�a����a��b'��γ�#BVOkm�[?�ID�\+߳����
�F7"K�W��Zta��򖇳�\�0�G��_+�G��R�lw�����Μ\��s�}h��2��ݷ�q��Z��ew+l��&>ur-������z�6i&-��j�o��Q�qD�h���|���o����4�L�뢚�9z*��G i�"�]�Zr�2��'�&��Ÿ�Z���+�{0
�.O���q�웴���E��?�+���eZ�E]����2Ϡ{ULr��q���UZf��r~�W1
�����a��r>�z�Y>�/!���]��yU��K3T�� 3z��y~9UY�ov�A�5���_��>�봘-�-�o(I:���z{Bg��3tr5}�s�x o�ʛ�}@�5���ka����u��^��b#��������ɣ�gP�wrm�6�^��/J��Z�+'��T��:�-r��a�>*��9�L���He�h<�)
U��G��  K�c��#^.g3�-3Ze�Bs+GB��Y��ߤ�Hʚ���Nɨ�]C�.ud[�͞ԝ�W0�&���5t[�d{�A8�8�Lv��!�V��3�Y�d0J���p�St������_��'�<k:�b�y���a�����9�t������o��:&ˋ5��n/���7�V�l�Pn��%FT�qb�b8!v��.(�����|���R�Ͷ!�VA	�l��N����m8���ژd8j,��Nð��W��L�L���h�t�A���̅���i{�X���,�0lY�;��+�ѶK当t}�#�8�6����ۆ��\�����������H�:o�l.���89�q��1����N.'C��\�սI�\/Ry���y:�e�|�-�ž�n_��������"�h�4��\UA���by���E~�e}w�, �_Y�ʼ����K��c�YPu�&�S]�a�E���ɑA?OK�cZ�]��a?����a3�Xif��������u͞����R����(ߵءH�C'�2g�u�3�7�����Ɲ7f�
��P��2�X�:��������n�         �  x���;r�0@k�<@��.�����"�X"�")��8)s�\%�� �-
T4��7$8�}|�A����[��V��$ѕ�W�G�ʠt ���N� e�V`-
���nۧ�Kܶ������v�~�_�J�^ఉ~A銤P��~5"P'*(�u\&j�q �����S�.�9f�@��o��c�ɯ��"7��憐��f��'T�'��?�F`ѥ�l�q�{i��~�̶�x��M馈��U�ϣ�#r�:�=hv'\4m�9'*�$��SWHh���".����
�] ��M�8Ι��� SΩY{Iy�����ХR���P�Q�$)ou<�yK�N�`�j�+I���/$���b���B�����=x��C���Cǖ�3��<)�� �`���G r<=.�!�܈��:�ҕ�V2�\7sZa���DwC���{����GѰJC5Ƒ�360�33CB���gy���b��M|%         e   x�u̽
� @�Y��^���K45IBe�X�O�I�v�ç=#�L
)Ax 5��A8��)�4���6O�{�ݣ��B�,��K���τ���z�9�7�=!]         x  x��ˎ�X���s��4��c����\�H�;���.ϑ����J:Ig��Lkfaq�tJ����T(h����*/q��^�j�O����+/QQ8�*'B#�{�c���=[+��t	��1X τ��O|Kν��]�pK��(mmJ.�؟�%�F�Q%��������r�r�"ҒC�e��*"=�Z �e5��T2ϣv7c�OPqM����c��)��Gy���P/��qJ����VPg1����	�yS������E�
 f:C���� �} �-����1"�	�Rʍ�2C&B�h��y��\ж�:�4�nf��� ?^�k�� ��U�}!�D�2hS�N�d	������|U�c��J�*��VC�\ۆu��:J[x5:GQ�(���A!E��T��.��󆜤���TN��8�N���<����6�dˊ϶�&J�y)]'&��/��*�F��O��g��<]c��w�z���m�fTʸ'OM�v����yL����Z�V��Q���IJO���[S�����p����y]��Ɛ�<&�ި��;<�!��S��(.�!0�f��&	|ԥ�'�?I]���^�2�.>
IN�%����s��P��c@�/�Z�S�=�T¥1��p?B���uf��Z�E���I�!�����U+8����s�K芢~ e��	�Ӆ��t�WO��<BMe�vS���W���Ca��ip�t��ѐ���ެ�x>�}J���wB�� hӹ�&�˗<�ݢpz��9��g�.�kc͟J63����(o���6��yg�)\H_ݑo���Ϻشa���i�[כz��i�� k�!1����p��w,G�nטF�N��\v��j%Z���>���	�'����/(��     