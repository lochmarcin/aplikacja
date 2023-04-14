PGDMP         .                {           moto    15.1    15.1     %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    16398    moto    DATABASE     w   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    16399    changes    TABLE     J   CREATE TABLE public.changes (
    todos bigint,
    "doneTodos" bigint
);
    DROP TABLE public.changes;
       public         heap    postgres    false            �            1259    16432 	   companies    TABLE     �   CREATE TABLE public.companies (
    id integer NOT NULL,
    name_comp character varying,
    "updatedAt" timestamp without time zone,
    "createdAt" timestamp without time zone
);
    DROP TABLE public.companies;
       public         heap    postgres    false            �            1259    16435    companies_id_seq    SEQUENCE     �   ALTER TABLE public.companies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    16402    fcms    TABLE     �   CREATE TABLE public.fcms (
    id integer NOT NULL,
    token character varying,
    "updatedAt" time with time zone,
    "createdAt" time with time zone
);
    DROP TABLE public.fcms;
       public         heap    postgres    false            �            1259    16407 
   fcm_id_seq    SEQUENCE     �   ALTER TABLE public.fcms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fcm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    16408    logs    TABLE     �  CREATE TABLE public.logs (
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
       public         heap    postgres    false            �            1259    16413    logs_id_seq    SEQUENCE     �   ALTER TABLE public.logs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    16414    todos    TABLE       CREATE TABLE public.todos (
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
       public         heap    postgres    false            �            1259    16419    todo_id_seq    SEQUENCE     �   ALTER TABLE public.todos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    16420    updates    TABLE     �   CREATE TABLE public.updates (
    id integer NOT NULL,
    wersja real,
    url character varying,
    "createdAt" date,
    "updatedAt" date,
    actual boolean,
    name character varying,
    os character varying
);
    DROP TABLE public.updates;
       public         heap    postgres    false            �            1259    16425    updates_id_seq    SEQUENCE     �   ALTER TABLE public.updates ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.updates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            �            1259    16426    users    TABLE     �  CREATE TABLE public.users (
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
       public         heap    postgres    false            �            1259    16431    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229                      0    16399    changes 
   TABLE DATA           5   COPY public.changes (todos, "doneTodos") FROM stdin;
    public          postgres    false    220   �#       !          0    16432 	   companies 
   TABLE DATA           L   COPY public.companies (id, name_comp, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    231   �#                 0    16402    fcms 
   TABLE DATA           C   COPY public.fcms (id, token, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    221   1$                 0    16408    logs 
   TABLE DATA           �   COPY public.logs (id, type, info, who, whom, did, details, link, date, "time", "updatedAt", "createdAt", success, "todoId", todo_internal_id) FROM stdin;
    public          postgres    false    223   y%                 0    16414    todos 
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone", "whoAdd", "whoRestored", deposit, time_morning, internal_id, fv, active) FROM stdin;
    public          postgres    false    225   �8                 0    16420    updates 
   TABLE DATA           ^   COPY public.updates (id, wersja, url, "createdAt", "updatedAt", actual, name, os) FROM stdin;
    public          postgres    false    227   <                 0    16426    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt", active) FROM stdin;
    public          postgres    false    229   �<       )           0    0    companies_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.companies_id_seq', 18, true);
          public          postgres    false    232            *           0    0 
   fcm_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.fcm_id_seq', 1, true);
          public          postgres    false    222            +           0    0    logs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.logs_id_seq', 163, true);
          public          postgres    false    224            ,           0    0    todo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.todo_id_seq', 234, true);
          public          postgres    false    226            -           0    0    updates_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.updates_id_seq', 63, true);
          public          postgres    false    228            .           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 34, true);
          public          postgres    false    230                  x������ � �      !   a   x�3���/��(-*��".#N��"��"(׌��*3�����X��P��T��������@����8�9g@Q~Z�ciI>�C+#S+CK=C#�\1z\\\ ��!6         8  x���[n�@ @�o��K���(bb�0B��FX}��&����\�H��ohS��[)��ΛO�S Hi���5�S��
�?�VR[J��TW�MT���ҎB���-1�ր�\�K��,Q�ڣm$�c#�	E9���O���펺2�!�НW}7 ֕]�{���6Y��8;1���B��W3����s}�_V]�g�����2�h���/�����mA1&�*:ݾf4�eG�0�JZm�n��9�c[:���Ƭ�v�Pw9>�����U��`�hӄ"�����zIh^��~N/+�G_�ַ���0�/T-K�            x��]ݎ7v��y
b�G��_�A��$ެwa�7Fi��j�Lפ��cM��X�3~���.�{�,��쮪.I@a-}�S��xY�j����}j6��������z��{n��ߢ���_k$A�C3J_d��/�IU��Ð�pV�q}�￾��Ӭy��0LY
���LnZ3�H�J$q���d5)C��<�nq�.�d/kq�Qb�����e��d�j~�Qb8/<bq�^Lf/YYs�a�`�$U��n�?���'���:�^QՂv)Uh��-;�Ρ�@O-X���0�)ؑ�3�sҐEb�r`��=��鸳�#�S�Ix�D Fa��"�;��@�ø��T���Yw�ӓA�����^g}�z�������o���ܬ������ֳ>}h����52]-zg0\Vyw֔�ZS�o0Lh
v�T��R��T�fr�=g�'qW(d3Z�p�f�0�*�;k�\֔��0�$�0d0L*�ĝ5t&k y��aɤ�Ð�p�Xwְ�������&1d0,X
v��l�TԔn>I�9O��1�5~�kXu�+��lI��>w���Y8
��Z%��NV`C�Yr�A��v��.�q%�j�{2�#I�rW�����n�\��,������}ڬo�6�wO����xއ���~C�҂uO��o��*֛��G�W�E��m�^m������r�k�/v���
�\ޯ7���V?�H�E�39���i�0�q"��,YF>��-�1r^g��ג��p��$nɓe�0r$�HWe��-yr�;�<w�LK"1�VeqK���w���?�$G��,+���Nֵ��zK�%��
��-��\����P��A������Q)*���B��0/�$~cl���%7l,�+�5G�A�gI܎W2'�r�"gP
��Da�,Ҹ%���-w(\a�p��-7�K��]|)àE��RZ��ϫ�.��zY#r��������w�ѫ��ms��-�Yo��������fנv�j�n�5��t��=��u��T�n!��>�~'���u{� �i���lw�y�Y�~����
������;�����f���o�׫UWUu�^5������նF���M�[�Kú�k6�����nu��4�|�%�n��4w?t㰄��c��[߯~�o����G��������f�-�]��{����)�zd�����D�'q�A�\ZNDU�S����`8/Ӹ�&:z�������훻��4�9>��l�mؠ0L2�ĭm����{Y���F��DO�'�s�=�i���q��a����\//kp��e����
�˫K��O��O� @��?M�^֛��|[�*|*c>��@�V�d���x����ԁzsG}�>v1$?ۮ ]���>��.Q���XF�߁�^��2��e�z�.�^�_�ka�ϗK��?��\ݢ���^��T�|�`�]-͗�Yu��r��*�yQ׹�Y���;�ul��<������G� �Ǽ@��顴Cp*ר9%���sGa�"�|w��SLϩ�k��7��F��f	iղA	�-��/-�6��沷�k�$���pk3O��ܛ��������ݱ/��Fl��Q�R��\$-�?�7��z`5�s���K1��O�S�a%}�:�$qks>>B��R�6�^��m�����[��H���&��&����)��\�K��2�ot5��*b4�GqAy�FW��
br�=�f#�ȭx��j�!���}�x����u�~�n�X�HPs��0L�"��!����W�b�z��|�y �>��Xw�{�?8�ȃ��7�{3��J�V7����f���ٵN�O�T�NҬ~r�h��;mq+���pmb��sc��
iQ)�jB5�y6�)痄��~0A��X�!����;��v|Yr|�U�c�?Q��~z�W�3�.��á�r��1S��r�[A�S��7}礪�ǡ�H��ڇ-�X���v��������TŐ(iʾ[��*XX��3��5�$������Ƀ	���M8���Q�����Q.�#� �1�����:p�7pF����0��'�~cj�.��ll��ڡ�;7p��_E�Sa8��� ��H�l	��C馃�2
K\�Ka����p��^�d�������wV�<�0d0��y7�-�Ɩ����Xy<�Bv����J��]�V�0L�2��.`�EN�ln�Z���1T��8�UD��<�{��X�����.Σj�Z�̲�hOU���.��*�G������*B܉�tV1��|��,���`�{�!���/��O:k��?��A��|����;�P���O��� %{�h�R��3&���Y���P1Xh�ż�q)TH�7�胩YU�w��ʘ�(�x�*��"�>u��H�"b��H�K�\�l1�����լ:���,�3��h"Ҹԙ-��"]C}$ƫq:Xg��I\�ڟ�˦�u��L�SD��Y�'�J�芉��ͨ�Te�fKU�Z�����n!��Y}Q�����Y�S�ߢqJcQ��~��4�otUt���h}Չ���WD�X��B���r����ގ�\��<��v��;�$��*�tr�9)�$&��WI�F�胟Ìt�h�����S��"�0i<HQ�)1 �R�|�gN�����"!����ᮮ(��SBt�=_4u��$Rd�ǖb��wEF�.�>�hrZt�� �Mf�����(ӕUB����S<t���[�\��n�S�k���^~ڽ����$�<�����F�LXi�7��=�7C��$�l�c�5�m����Gs;�8���I)#�J���
�qwRS���"gp�+�{�����%�We��N��r`S���fy����p�/<��{�h�[¿Y��ڬ�m�n���i?���h۷�/h�6Jm�w�t�o��@����s�iTs���]��pQtJX\F3Վ1�6\P��<���4����'qs�����t�h�R�����p����+lkz���$W5#�4�A�cI�J�R�[?��gP*M▙ƙ�=�ң��0X��$n��<G�s�p����Gp��G�T����ȹ]U~КhUV���X��}�rC�'I�jN����xÖK�e���!���� ��Sòܼ��ˡ0HZ$�[e�K0���0��/�-����؋����|Չ>��0d0�랢(n�?�Eٷ{�/���K��s,�ݰEWdY6|������ϰ��g��U�7Ù>Ê�r�U�L$���^u]h>K��Сgi7C�	�Zv�J&�g�0Lt��{����C���C�D�LFqG>~5�T�w�x��;ge��98U�I:h~�9�������s�ss�YI{�5�?�2N�rFR���9�:�vN�X�b�A�g�� q�8�㜤q� �T|vЬ��#.���Ҹt��z6��A��G�G�� I\:(�Z�v�0G�i\:�P"�g��2�2��*6�4.Tj%�6'�{���G{�*�����p[ߓ�;�\�NC��U9�0����#����L���T��X�5EqG>��h�6�;�wZc�۳k-���8��$�n%�Ub�9կ���7V�>,�����A���Y%F[S�*�J�#Rr��A�Z\W� qt3�����~�wBb��%��� �H��]�4��_)Y�EDJ�)K�R��ۨg����k�sKC׵���;�g�m��Wk+1�%E׫5H�<�tg���{Oͣ�q}ܫ��Pu�����@�����ӈLZ`�EU��G���*��`�	�U\�-CA�覟Y�'�F�7�ٚ�q��Fw��*6?!6���H%D+�1����CGw��*V�)$b9�E��M!AGwZ�*��)b�<��v�)��>�YŞ�Ì��U3}Q,ô�l :��4��s� �z�}���I�n�/4>�S�/S�{X�Ð��['��#'�o�������4�$�r�s������.v�\S�ݜ�Ywx�|�����B�L/빣�pFX�Zi?с~R�du~����e�j�_4ۤ��AΒ/~D�C�̚�k�i��/��<�~��X��])o]{�.U�
   3o����;�4��@���և=%<�N�ƽ�7���fu�(�w���5��$�f��W��٢{�Ð�`�q�{��b�����_�|9|V�a/�N�I8�5�	�!Z	�aFS�q�WX��S�=�e���	�W7�U����&���$q6�;����Y]��U!�Ð�p��$��'��r��+��!����g��ȲZ�9C3��!�[�	/�,e�b�W�Ð�pY�qG>�>Uj&_(E<�2�W|�|h��% ����n߿m��u�������lX�)0(k��&e�K��7��.گG��ZP�`.���f&]?��6�u���NF��<�mf�~v�>���;֘s��9�M�jKJqeO�q��t�Z�|��'�;����/���;�^��q�wݸ�'E�{%$��d�_��0�J�(����u+}�)?4�r\i���"�=4�Q��i�=����ނfI`��K����G#a��!�ȏ�B��.�d�0,�*�[w���GGN���%Q�E�p -l�KL�>,5��0-�0u�#?�;	?������Pe�;�9kR��%���f���n����ܼ��'Q�d(Dw��筎��vAjƩ�0��t�;�I3�Bn�|��v�H3�-<����|�W�
�y��������%	����t�.�u8�
��͒�e�'�F����0\d�?�ȧ==d٩k��,T�B���w�z�,���%Q�dvK|�;�IY���F�|��=�̳�Qܐ�/..� �ʁ         X  x����R�0���S�!�J���Sg�n���.L�������K�W�y��l��D��8y�����~$2�>�2�ގ����pC	�RE-���Ǝ"�6����c�β/�,+�w�,cv���Y6�V�棫�S���@��� �R� b�v�OO]#h��K�J�n�q�?�l�:�*A�HǕ�(�c�;��e��ߟ=�r��s���RgH�ŉB��J���=eZ;]t$�+No�T+?���	8��B:�[�0eyT*�h�Xy�r(lk	�1H��&�[�]�r��ޏ�q��W�R�]f_')�����"A����!Z����I
��e����N��Z�+Tt�i�cɠ�8[�w��zg�ڃ��:^ޤi���@ Z��h��ط�"�k+KP�,��F�P��!|�p�rP}s��y�d��E�J��ke��QVa��*����o�}���Z,UY�΃`��8���k�g���X��L�縔��,�Q�b<v��b�G
Y3��HR�"&jA����I��Z����D!������(ZQ�Z����@��(�Z�%����iwΗQ�����o-.���g2�:�z
�� գ�o�t)�1��(��E�{Ph��� ���6֏B���$�-Da�^#`��5"��Ua�����_����*����w��p�)�jg��b~�,���	��;��y'ڮ�Ks���$�V���8J������\*�^xv��Hr���ʙjQJB>��txx��Z6�tD�'y!�>���~��u�Ɨ��Mq�MV�����!ڈ����lt�����������9��D��O�l3�<FG	�k�P�%�M�B&�|1[��?��`�1s��         �   x�}��j�0��.�l��Cl��B��-������&�z(���/>��7��� ��n`U�����%��/�.��N?��N�Bqm,���k�`	��1Ղȉ��F�M|,�q5V�?���z��4�K���5�T���������7� ����?����R�|M��n�6d�����?M`��K����Y#�M�^w�A���^�Q�;���C<a�u��hK           x��َ�X����ȭ��f���f56����qۀ1��s�y�^s�I:I's3Q4��)��/���*�A�E���u������%J�yo��dT��ST���l&3
�U�	�\��}WPY��E�;�x])�q4���}��T��6���У����u���: �dS������~>��W���.J�)fdj�)�'`m�i�b�y�u�L���3��$B�09����;6�������̞��b�w]�-����5�� ;O�ǄO��Dp��3��0���8�=��-�2 �)���	Mz)M�XH���nS{ҮG���l;c¢��������9�8T��5��
Y��n�)_��<?+ω��2��k��2c8w��ܓV�8|��1�M��� 7&�Jre�W9��J5��H��	�����1���)��B������pCԯ��O�r��5�`L�h� ݱ��:�f��a%�Y�����d6�@��t��m�|��ʄ1����?Y�횑�h"'�ٱ�i>�F318U�E�
�C�9xB_G�����Qn�(}��l6�*��ĭ���z4c{����W_����5��������6�ŝ���pd��CD(����E)<�^���=H�֟?6B� H֋��Xr�Ѣ9���幉�\�ض�׿�E�{]�|����V�`����YQja�4�L>��p�^����o=�`�� ����Յ��O�_����>$����o��կ%�d�$b�ϕb(BO��IP�8���ɂ�T��
>SF��YT�֬f��&u��4���j#i//A�̄<�-��_Р	�C7Y�J��j��+����Ӫ��Gn�lˍ�ιS{5_��'L���%����稸��c�#��𗻑��.��2|ӑL�6	s�!�v$R_W��S�� ���ײ�.��?�]~�������#xg�[�x��ƽBlɻ\����q����0��2,h�g q��1:L��YѨ��j�e�#3@�0�VM����� H�ч�����+     