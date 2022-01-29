PGDMP         2                 z            moto    14.1    14.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16395    moto    DATABASE     `   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    16452    fcms    TABLE     �   CREATE TABLE public.fcms (
    id integer NOT NULL,
    token character varying,
    "updatedAt" time with time zone,
    "createdAt" time with time zone
);
    DROP TABLE public.fcms;
       public         heap    postgres    false            �            1259    16455 
   fcm_id_seq    SEQUENCE     �   ALTER TABLE public.fcms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fcm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16405    todos    TABLE     	  CREATE TABLE public.todos (
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
    "whoRestored" character varying
);
    DROP TABLE public.todos;
       public         heap    postgres    false            �            1259    16408    todo_id_seq    SEQUENCE     �   ALTER TABLE public.todos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            �            1259    16414    users    TABLE     v  CREATE TABLE public.users (
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
       public         heap    postgres    false            �            1259    16426    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �          0    16452    fcms 
   TABLE DATA           C   COPY public.fcms (id, token, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    217   �       �          0    16405    todos 
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone", "whoAdd", "whoRestored") FROM stdin;
    public          postgres    false    213   �       �          0    16414    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   !                  0    0 
   fcm_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.fcm_id_seq', 1, true);
          public          postgres    false    218                       0    0    todo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.todo_id_seq', 156, true);
          public          postgres    false    214                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 28, true);
          public          postgres    false    216            �   8  x���[n�@ @�o��K���(bb�0B��FX}��&����\�H��ohS��[)��ΛO�S Hi���5�S��
�?�VR[J��TW�MT���ҎB���-1�ր�\�K��,Q�ڣm$�c#�	E9���O���펺2�!�НW}7 ֕]�{���6Y��8;1���B��W3����s}�_V]�g�����2�h���/�����mA1&�*:ݾf4�eG�0�JZm�n��9�c[:���Ƭ�v�Pw9>�����U��`�hӄ"�����zIh^��~N/+�G_�ַ���0�/T-K�      �   3  x��Y�n�F]����;ӹ�ͫv;F� �0���j�@�`Ļ䳊n�_�C�E�ʱآ(pQ&���>��co~���ҵ�R�ҖFqa��sv8����?�\V�1�5>�Z�Nf�����G��8�T?Z(��.���h:M��.�ٶ�\4���J%�2~�y&�1�i5eڼ����>�6�h}-@�B��s�6U��Xv0��\..6�/��7���7DO�N&�7.�A}�F�'��旓�*�ы�zu
�7�<����Ƴ�b���v�q�ۆBG�R����7�����nq�p/0�����V�����������]��ȅr�߉L	�D+�H�4��E�`/&�U�j~:�Χ	P���zt�,�;�Z����׈���ɫ�pˆ6�1� `��;���L�z�x?g U�m�����ca�<�����?��HJ[�Ց�y1>g�ѡ{��O��Ug�IŤ���1�a��Le)*�@HSɥ5	*x+����鼟Z�����1�./��:_Hh�����[����Ǻ�UV�&��i�[�٣�'�3�]�;��	�$H.0�3	�	h��HP���b��$���$�ĮT	H@�4����+L��&�-�Q|�듣�/_�&���F|�V�V.�J�bև��W�xtp|r�$�o�hbcU�N�Lˎ���/1��@k]�8�9/�g��dy1��ڮ/�]�������=7��<���S�L�|�W�-�����`�R��Ȧ#ϴ�Y�� %�qv�����Z{���F��� �v�wmTH �_�xV���h��S>w:�Rp�~4�-�[�|�K�I�\�9JÆ���.'��?��rqY�W_�O��w� �n�i�;��Hȸ:1�f?=��b���넋V	*����V�f!��4���%
��\�܂��� C�G}���lj���M�<��Lz(tPeS��#f�Lf(#�Ou
H��v*8a��0�O߉��
��ih��l�k\��*��<��it��˶FDCbъ�R���o��Pl�ΚT'��'rXm�v��p��n���,p�s��i��nH��l}�2=�I�[װ0i���ι\�Tf �#�LP!7Sțjs�	ז�fH�K��٥TKT���,�K�gr�x��i��R�Qo;~�}_�����i[˗Μ��*�k�6�fPŹ̙���دi�Ӎn����ŮB��s�1�W�Η��5,��z��J�k_��jv���ճ�1�pt4z�쇬� �Z���".�J��k��1;��|�q�P�	 Z>`��N�z�u5|�$���2���2R�w5���d�>�zE������ׂkt���ɬ���ή&�;�7S8���O>W�mlj�U������L�&��k�����E0�8?/��iqkm$Bhְ��Raߤ!�cwo|7=��|y�8���_�ޏ��y�{�X�L�ĪH�-�����N(&V�~kH�gZ�@�<�zQ-tj����v?��R�:�i���R;�[��-��=�>�+e]8~��d\��V��=�Y�Ո�%���]'D�؄M����|�)xh����ŉHC�����mMkڨ��Yޤ�8D�����m�|t���hk
!�D,�H�"�4$ҐHC"�4$ҐHC"�K�4$Ґ6�9ҐHCj���DR{EiH�!��D�v�!���!��DiHI�!��DiH�!�� 	HC"�4$ҐHC"�4$ҐHC"�4$ҐHC"�4$ҐHC"�4$ҐHCҐHC"�4�u�!iH�!��DiH�!��DiH�!��DiH�!���ѐ�򽽽� � k�      �   �  x��ˮ�J���{
]��!�((�(r1�D���T.��p�Z���ٽ�l�I�䐪�Z�Z5�R��T�� �Zŏ�=o��x?S3յM��(�*���p��j��sƺ�<��:��\ˎ-j���",�w7�����b��|�J�l�b4F6F�WZ����F��ɭ�f'��:=��]�u-�]9q���3	���*���Ҩ���EW9�%�(יiL���-����p�q9�g��z�L����<#��� B�4;�QBa �.aJ���:��*�5�����;8W�ӳ�= `*!�2� �ȍ�M��&&-yE�[�.x{��/��r[������ۮ����]�P=I��]�(s�WUUfL��Jlm��'�%��*�ȅR�{A�`��G@� ��<%I@-�aT9���2�� ]W ���\���X��h�s~����۠��2aM%�c��A-OG Y�a%��Er]��VSSV���H�y.�8S��G
d�Ɔ���LT�3i����p����;�N��Z]O/��Q�k�'�?�'�y�%z˧{X�!%>#u�½�V���E�׺T�b����oM��C(�u�����#��q�v�-��;�3�c��I6��\��)�m�!<�{��ɇ�q������-��ѿ�;����PҡL{�ˡA #O���99D[�����A��W�N^x�)�9�p�gC����z�z�z�z�z�z�z�z�z���^}f���G�     