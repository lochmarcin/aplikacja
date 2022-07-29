PGDMP                         z           moto    14.2    14.2                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    moto    DATABASE     `   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    16395    fcms    TABLE     �   CREATE TABLE public.fcms (
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
            public          postgres    false    209            �            1259    16401    todos    TABLE     k  CREATE TABLE public.todos (
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
            public          postgres    false    211            �            1259    16413    updates    TABLE     �   CREATE TABLE public.updates (
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
            public          postgres    false    215            �            1259    16407    users    TABLE     v  CREATE TABLE public.users (
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
    "updatedAt" date
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
            public          postgres    false    213            �          0    16395    fcms 
   TABLE DATA           C   COPY public.fcms (id, token, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    209   �       �          0    16401    todos 
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone", "whoAdd", "whoRestored", deposit, time_morning, internal_id, fv) FROM stdin;
    public          postgres    false    211   �       �          0    16413    updates 
   TABLE DATA           Z   COPY public.updates (id, wersja, url, "createdAt", "updatedAt", actual, name) FROM stdin;
    public          postgres    false    215   b       �          0    16407    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   �                  0    0 
   fcm_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.fcm_id_seq', 1, true);
          public          postgres    false    210                       0    0    todo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.todo_id_seq', 193, true);
          public          postgres    false    212                       0    0    updates_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.updates_id_seq', 35, true);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 28, true);
          public          postgres    false    214            �   8  x���[n�@ @�o��K���(bb�0B��FX}��&����\�H��ohS��[)��ΛO�S Hi���5�S��
�?�VR[J��TW�MT���ҎB���-1�ր�\�K��,Q�ڣm$�c#�	E9���O���펺2�!�НW}7 ֕]�{���6Y��8;1���B��W3����s}�_V]�g�����2�h���/�����mA1&�*:ݾf4�eG�0�JZm�n��9�c[:���Ƭ�v�Pw9>�����U��`�hӄ"�����zIh^��~N/+�G_�ַ���0�/T-K�      �   {  x����n�8�������H��;��n�uR$Y(zCK�C�J�a]�-������ݢw�^d�d��v��;'��a����C/�d̑��x��kۈ��z��*��q1��W��,�W\�'���Tf%��2Pp*f�D���*yq�y�U��y2���?���~F}��R��q���k$�L�\sh!jS�����9t1�;��8��F0��w�mQ�A�"���<�9.��`8(G=�#��1��P���0������-t_!B�9�����._��]t_]����_^������$s<.�rmG���w��'���o7�եQ)��.6��U���^N�l�/o��m��w��ס��l���A=���B��ZE*�j�|����[8[
D(�>w!D�3Y�$���螧���o�HO"�[��z��� �a)��CL��q$&0?��c5�\�;�| �Y+s%��'��k56a�K>V�'�S)����Դ6_�)� ��r��뼰�V��=4�sI�q-���Vɋ\����'�GWS����68��8��w_�xCW``5 J�1!��]+p��B���:����C��/�''$�;�B�C���tO9L�,ԏf�x##�g�����C��!����A��;`٬TcnpF��p �o�>;��6�70L;6�0��_Ŏ��pH����XvxXok�cux�᥻u�$6d����Ri^�����p_B5���"���o o`W��5|��@ $̜���c��>��MRyG�����Iֱ̊Ի ����Ƴ��En��T��_�ՃB�Һn���!5�J�\�idR<���J���	��yj�;��	$Ӗ��L��|
��*�U7�0Y@��z�&��V��� �(��Ԁ�����`��W"�Ϫ���ĸ!o�t��k�h��S�5%�sP?z��iA���� �R?v����,��S _�y�4��Y�sXom8h�S�1+d��� ������=������=s�8��s���A�^��a��"�gB����4�F�jSӗ�@��
Y���8�:�����O�HJ'<����.�4q|�c�}����%[`��y{��Z�l�s�`��~��d�\ϯSC���;	NI��Ǡ�N%���V����m�b�p�IM�z]h��\鹩���y��)���յ=77B�X;���p�/�"��<<u�DP߅�Fs۔�X���*O�󚇌�h��IvZNB�����|�=�S�8��mh潽��֏�y�b�ƶk[��[S�mf84�����zk�M:�6��"�wPo��&�p;4����Fot��@m:�G�Qf�tP��6@�;W�@퉨>��5���)�	���uS�O��)�Z�S����J_m�-�|\`H�Ll�,�J�p��o1��9��oJ9n^��h��)�FNR�ի���>@4����U.���4.��K�O�z����Q�چZ4f���%i6U*u#�)O#�Ke�d=��׻v��>$���5z�fvt��|���v ��{��Z?���i�M���(s����<eo����'�ԏ�w�hY����;zk�zM��Fh�m����m� ��-N�轒[��h���� G�]      �   m   x�36�4�3�,�KIM��KM�4202�50�54Af�q��q��!	��z�&Q��!�ɞ����A����~F���Q��Q��fzy�8�/����� 7'�      �   �  x���ˮ�@��5>��J�
,QD�� P!Mr.��ˮ��*���v�m�.,f���� y*�	E���������w�j�a`k�ө�j��.�������4��_b�iw����آ���Aɥ���8|v�,^ʹ��3���!��F��@��J-7�ヺ��s���z/��x>��TS�:Z��M��.��$��}/�3�U*��'<i��E���ui苵�قI�V��s�*N�T;JA'�{��K��S@8̘�-!7���I�S�c��*���]L]ǘ�ù�[��V�,������>��viݟmPf]�3����IǠ�S���8|��"��ǳVU0�-�z*���7'���#��{c��m�LP�3i��	�ll|Ys�D�
=�Z���4Jk㻏��G��>�ˢ.���>]U���>S�ېb{g�B�V�9�,M�Ƃ��z�[��!��c��y0��d�ԉn�aK����5N_�f���Km��Eޖ�!s����[n��9�[���a���͐͐͐͐͐��G��%�$ʩ/��AJ���>��
Y�x��N��_��d�l������1l�@D �.��{�]W��f&��l:q�b^K+�`�c�N �("qވ�/��W��wvU�),C������-q�+xK���/q�b�q�{"���x ����? �D�F����E,     