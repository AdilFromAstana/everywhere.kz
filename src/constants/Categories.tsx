import { getCookie } from 'cookies-next';

const categories = () => {
    const data = [
        {
            nameKz: 'Концерттер',
            nameEn: 'Concerts',
            nameRu: 'Концерты',
            code: 'concerts',
            icon: (
                <svg
                    className="lg:w-14 lg:h-14 w-10 h-10 text-[#2F2F38] dark:text-white"
                    width="77"
                    height="77"
                    viewBox="0 0 77 77"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.4753 20.0569C37.8363 25.4338 39.5618 44.6143 39.4815 46.38C39.0401 56.4918 32.3791 63.2731 25.036 59.5012C15.9674 54.8466 21.0235 39.1972 31.0151 40.9629C34.9072 41.645 35.3486 40.2406 31.5365 39.3576C18.5356 36.3482 7.94205 53.3618 17.7329 61.5877C21.4647 64.7578 33.021 63.7144 39.4011 59.6217C44.9789 56.0504 46.2631 52.158 44.8586 43.2098C44.1363 38.5552 44.2566 35.8667 43.3334 27.5605L44.6979 28.644C50.9176 33.6998 60.548 32.9376 62.8354 27.2395C63.7984 24.8319 62.7949 24.6313 60.0664 26.7179C55.9734 29.8478 51.3992 27.3599 45.9821 19.0136C41.5281 12.1921 36.8732 10.6271 37.4753 20.0569Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            nameKz: 'Театр',
            nameEn: 'Theater',
            nameRu: 'Театр',
            code: 'theater',
            icon: (
                <svg
                    className="lg:w-14 lg:h-14 w-10 h-10"
                    width="77"
                    height="77"
                    viewBox="0 0 77 77"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M39.7873 16.413C37.6106 10.6458 35.0714 5.34099 33.6533 0.265048C32.7608 -0.266824 32.0177 0.118526 31.3462 0.40874C31.1391 0.499385 30.9431 0.591811 30.742 0.683393C30.5133 0.752947 30.2984 0.854571 30.1042 0.986367C25.5358 3.22644 22.6245 6.11001 16.3989 8.81231C14.1178 9.80275 11.0969 10.9534 7.96296 11.9384C5.38485 12.7486 0.902734 13.4946 0.138937 15.0142C-0.256396 15.8024 0.285642 17.6094 0.600644 19.0118C1.60448 23.4699 3.37292 28.7793 4.71509 32.2076C6.95575 37.928 8.86666 44.7048 12.1205 47.9105C14.8989 50.6449 19.1436 53.9322 22.0885 55.2266C24.5605 56.315 28.5963 57.2725 31.5982 56.5493C33.8889 55.9974 36.2823 54.1674 37.7763 52.7183C39.1746 51.3608 40.7066 49.0365 41.6033 46.8844C43.2587 42.9151 44.4999 41.1448 44.5922 36.8523C44.6164 35.6797 44.966 34.4604 44.9289 33.4076C44.7442 28.1037 41.9045 22.0254 39.7873 16.413Z"
                        fill="#2F2F38"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32.9887 2.66211C34.336 7.01945 36.1434 13.5427 38.1328 19.1569C39.8978 24.1404 42.1014 29.2082 42.9032 33.9528C43.6843 38.5684 41.4186 42.2693 39.392 45.8322C37.804 48.6251 37.2585 51.352 34.6666 53.312C33.3072 53.5299 31.9496 54.6018 30.4252 54.7996C29.3791 54.935 27.6987 54.124 26.518 53.8411C22.9473 52.9843 20.6368 51.8482 17.4856 49.5231C15.9407 48.3816 13.8088 46.6349 12.8334 45.1657C10.7715 42.0579 9.38451 37.5504 7.72646 33.3156C5.63693 27.9788 3.65257 22.7921 1.9696 17.3682C3.27545 16.7082 4.73065 17.1678 6.25657 17.0295C15.8578 16.159 27.8817 8.71115 32.848 2.71151C32.8946 2.69502 32.9421 2.67851 32.9887 2.66211ZM30.9846 14.8435C28.5912 15.5502 25.9509 16.9031 24.8548 18.3248C24.2524 18.6288 23.113 18.6461 23.2978 19.3703C24.9756 20.5704 26.36 18.367 28.3417 17.435C29.4733 16.9023 30.8827 16.3851 32.0177 16.1453C33.7215 15.7855 34.6217 16.4711 36.2555 16.1553C36.2798 13.6269 33.1259 14.2119 30.9846 14.8435ZM16.7485 21.5013C15.7344 21.6789 14.2947 21.0272 12.7921 21.3914C10.0871 22.0478 7.23021 23.4438 7.83694 26.1242C9.17566 25.2774 9.57524 23.8438 11.658 23.2873C13.0069 22.9257 15.4073 23.2598 16.8849 22.9495C17.9336 22.7307 19.8471 22.371 19.198 20.8084C18.5369 20.3836 17.8447 21.309 16.7485 21.5013ZM32.899 21.992C34.197 21.7045 37.312 22.4844 37.047 20.2033C36.7242 17.4158 31.7294 17.6895 29.5147 19.1853C27.117 20.8056 24.6459 24.892 27.8515 25.9246C29.5708 24.9698 30.1664 22.5934 32.899 21.992ZM16.8728 28.9437C17.6004 28.9802 18.0121 29.794 18.8959 29.3976C19.7323 29.0242 20.0162 27.631 19.8445 26.9022C19.3223 24.7007 16.2057 24.0965 14.1031 24.5908C10.7655 25.3762 7.29923 30.2628 9.80309 31.4235C12.2742 30.5905 14.4406 28.8219 16.8728 28.9437ZM30.6307 25.7808C31.8632 25.5465 32.804 24.1194 33.9786 23.442C32.7885 22.1403 30.452 24.4105 30.6307 25.7808ZM13.4298 31.4821C14.2843 32.1073 16.2781 31.5682 17.2439 31.1416C16.8624 29.7126 13.5852 30.2088 13.4298 31.4821ZM27.5952 35.1639C25.837 36.0372 22.4614 35.3854 22.7868 37.8488C24.9403 37.3417 30.7593 36.6944 29.8125 33.7203C28.8052 33.6159 28.6784 34.6256 27.5952 35.1639ZM33.0551 36.5764C32.0971 37.6621 30.6558 39.0407 29.3275 39.7126C25.0559 41.8766 20.7387 40.888 17.414 39.7327C17.3277 39.5625 17.2284 39.6961 17.1308 39.8325C16.3661 41.8189 18.7742 43.8301 19.9921 44.9835C21.0649 45.9997 22.2093 47.1155 23.5178 47.7398C28.9667 50.3387 34.5898 45.6152 36.1528 40.9786C36.8692 38.8576 36.5127 35.7434 36.1235 33.3377C34.4897 33.4548 34.0641 35.4293 33.0551 36.5764ZM32.974 51.9087C32.4942 52.2181 31.5421 52.1036 31.606 53.0539C34.2678 53.6534 36.6422 50.5163 37.4078 48.5235C37.3353 48.3458 37.2551 48.1829 37.0323 48.323C35.7981 49.4847 34.5613 50.8871 32.974 51.9087Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.49255 15.0209C11.241 12.4202 19.2731 10.2863 26.3437 5.49144C26.5948 5.33302 26.8857 5.41543 26.6724 5.54179C21.2764 10.1949 10.2105 15.6791 2.49255 15.0209Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M76.1991 36.4493C76.5166 34.9315 77.3685 33.6362 76.8205 32.0306C76.1386 31.4685 75.0563 31.3092 74.5376 31.3083C64.819 31.2826 53.533 27.7464 42.7192 24.5352C40.8938 31.7862 38.3743 40.457 37.0762 48.4604C35.9853 55.1823 35.2438 61.7248 37.0003 66.4035C37.9384 68.9007 41.5229 74.2852 44.0173 75.7114C46.8172 77.3134 48.7255 76.7358 50.9791 76.9261C56.6713 77.4058 59.8337 75.5201 63.5252 72.6558C64.6222 71.8045 66.1464 70.3572 66.7308 69.5498C72.1683 62.0306 74.0102 46.9079 76.1991 36.4493Z"
                        fill="#2F2F38"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M71.9017 32.9471C71.9966 32.9773 72.0898 33.0066 72.1856 33.0368C72.8675 33.3444 72.0157 33.0679 71.9578 33.2941C64.4177 33.9778 54.3306 31.0329 46.2321 26.9648C54.6206 29.5427 64.4393 32.9672 71.9017 32.9471Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M43.9509 27.8906C50.7263 32.7451 63.8144 36.3115 71.8335 35.3961C73.0315 35.2597 74.1466 34.7278 75.197 34.4844C75.3273 34.4944 75.3161 34.5851 75.298 34.6802C72.8615 43.719 70.3688 52.6022 68.2741 61.3014C68.0376 62.2836 68.0825 63.3236 67.751 64.2673C66.6747 67.3211 62.6432 71.1174 60.3162 72.464C58.6754 73.4124 56.4443 74.379 55.0133 74.7415C52.2255 75.4483 48.5892 75.57 45.1264 73.4252C42.6519 71.8937 39.7432 66.7372 38.7239 64.1465C36.9813 59.7196 38.6591 51.2648 39.9806 44.7663C41.1199 39.1548 42.5638 33.3052 43.9509 27.8906ZM59.9839 39.3937C59.0526 44.1392 64.9373 44.283 67.4705 47.0365C68.4121 48.0627 67.8511 49.2838 69.3849 49.6216C71.3139 45.321 64.5394 43.8655 61.9276 41.3279C61.8378 40.354 61.3157 38.1185 59.9839 39.3937ZM54.0768 37.194C53.5779 37.3102 53.306 37.8759 52.7796 37.9373C50.7573 38.6825 47.7744 37.3624 45.4768 37.9327C44.0328 38.2925 41.7517 39.5209 41.9019 41.2529C43.452 41.5568 43.4477 40.2267 44.7812 39.856C48.1982 38.9049 53.4002 41.5632 54.7483 37.5711C54.3858 37.5244 54.5153 37.1976 54.0768 37.194ZM44.5119 41.9147C43.1439 42.5684 41.6075 43.8472 41.2226 45.3237C46.0318 47.3102 52.4162 48.3547 54.599 43.6239C51.888 40.8886 47.3593 40.5526 44.5119 41.9147ZM58.8515 45.6286C58.6599 47.1079 59.3814 48.6687 60.2989 49.8771C61.7809 51.8296 64.668 54.5548 67.5223 53.4828C67.8141 49.3314 63.5908 44.4459 58.8515 45.6286ZM50.2982 47.8658C48.6643 48.968 45.7539 47.5619 43.9509 48.33C44.4894 50.7421 50.1712 50.0143 50.9688 48.244C50.6062 48.1963 50.7357 47.8677 50.2982 47.8658ZM65.7978 55.7384C64.0828 54.6061 62.3376 53.4911 61.0723 52.0997C60.8496 54.1273 63.804 57.0108 65.7978 55.7384ZM55.4138 55.0885C53.7929 54.7379 51.6498 51.8406 50.5347 54.2033C52.7235 55.3283 56.7481 58.6605 58.1524 55.2972C57.4326 54.1035 56.6981 55.3677 55.4138 55.0885ZM47.1504 62.3642C50.3128 62.0841 55.0633 63.8509 56.7421 66.3884C57.2392 67.139 57.1115 68.9168 58.1861 68.9873C59.8519 69.0971 59.3599 64.6216 58.9051 63.1176C58.394 61.424 56.4815 59.1346 54.8053 58.3583C49.7346 56.0076 47.0788 57.6516 44.3936 60.008C43.4563 60.8309 41.6904 61.7235 42.046 63.3849C43.931 63.7748 45.3033 62.5281 47.1504 62.3642ZM47.4257 65.2523C48.1723 66.5009 50.425 65.8134 52.0347 66.5468C52.9833 66.9788 54.0345 68.4005 54.6888 67.0566C54.2339 64.9869 48.5615 62.8622 47.4257 65.2523Z"
                        fill="white"
                    />
                </svg>
            ),
        },
        {
            nameKz: 'Ойын-сауық',
            nameEn: 'Entertainment',
            nameRu: 'Развлечения',
            code: 'entertainment',
            icon: (
                <svg
                    className="lg:w-14 lg:h-14 w-10 h-10 text-[#2F2F38] dark:text-white"
                    width="70"
                    height="70"
                    viewBox="0 0 70 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M36.7583 4.32824C36.5361 3.94944 36.3137 3.57075 36.0915 3.19195C36.0882 3.18626 36.078 3.1913 36.0814 3.19699C36.3037 3.57579 36.5259 3.95448 36.7482 4.33328C36.7516 4.33907 36.7616 4.33403 36.7583 4.32824Z"
                        fill="currentColor"
                    />
                    <path
                        d="M49.7958 31.025C49.6895 30.5525 49.6091 30.0692 49.4511 29.6072C49.4423 29.5814 49.3898 29.585 49.3936 29.6139C49.4571 30.095 49.6009 30.5697 49.7169 31.0435C49.7276 31.0875 49.8056 31.0687 49.7958 31.025Z"
                        fill="currentColor"
                    />
                    <path
                        d="M0.391046 20.467C11.6674 26.8423 23.2907 33.1689 35.1663 38.7014C36.1766 39.1721 37.0142 37.9291 36.0633 37.394C24.7726 31.0394 12.7774 25.245 0.892604 19.7358C0.326891 19.4736 -0.140023 20.1668 0.391046 20.467Z"
                        fill="currentColor"
                    />
                    <path
                        d="M35.1069 2.6057C44.7345 8.97437 56.0102 13.934 66.4313 19.3072C67.6443 19.9327 68.7556 18.3082 67.5408 17.6901C57.1447 12.4016 46.7037 6.23112 35.6524 2.00331C35.231 1.84217 34.6683 2.31567 35.1069 2.6057Z"
                        fill="currentColor"
                    />
                    <path
                        d="M0.728613 20.1015C6.83944 17.8163 12.3521 13.7199 17.7828 10.4363C22.7569 7.42873 27.9522 4.58571 32.63 1.24811C33.3866 0.708165 32.4125 -0.321661 31.5886 0.0981361C25.7483 3.07388 20.3099 6.74121 14.7719 10.1092C9.89126 13.0773 4.3382 15.8176 0.254005 19.5774C-0.0639435 19.8699 0.332653 20.2496 0.728613 20.1015Z"
                        fill="currentColor"
                    />
                    <path
                        d="M36.6694 37.9326C47.0606 33.255 56.4183 25.7298 65.7668 19.6726C66.8969 18.9402 65.7811 17.2863 64.6397 18.0296C55.2181 24.1647 44.1781 29.8669 36.0459 37.2442C35.6428 37.6098 36.1497 38.1665 36.6694 37.9326Z"
                        fill="currentColor"
                    />
                    <path
                        d="M34.9348 37.5737C34.2208 42.7407 35.1812 48.1897 35.5419 53.3781C35.7223 55.9737 34.7777 67.1817 37.7256 68.3967C37.375 68.2521 36.7872 68.4175 36.8459 68.8267C36.8628 68.9453 36.8797 69.064 36.8968 69.1825C37.0227 70.0612 38.5581 70.1209 38.5598 69.1825C38.5693 63.5704 37.8586 57.9213 37.3819 52.3245C36.964 47.4164 37.056 42.2734 35.6239 37.4942C35.5188 37.1437 34.9783 37.2591 34.9348 37.5737Z"
                        fill="currentColor"
                    />
                    <path
                        d="M4.07189e-06 19.6355C0.0522257 30.715 1.9902 42.4333 4.01863 53.3792C4.17209 54.2073 5.80648 54.0177 5.74105 53.1805C4.87702 42.1294 3.713 30.3539 0.884181 19.5336C0.772809 19.1075 -0.00204887 19.2074 4.07189e-06 19.6355Z"
                        fill="currentColor"
                    />
                    <path
                        d="M65.2843 18.2818C65.3554 28.3932 66.9168 38.6061 67.891 48.6796C68.0015 49.822 70.1096 49.8306 69.9955 48.6796C68.9911 38.5368 68.5315 28.1805 66.6278 18.1269C66.5031 17.4687 65.2798 17.6392 65.2843 18.2818Z"
                        fill="currentColor"
                    />
                    <path
                        d="M39.0915 69.5198C44.1124 66.6171 48.3201 62.618 52.9502 59.274C58.0967 55.5569 63.9376 52.4209 68.839 48.4957C69.519 47.9512 68.6552 47.0888 67.8755 47.4319C62.2238 49.9176 57.0812 53.8825 52.2437 57.3853C47.4291 60.8715 42.0314 64.5104 38.4917 69.0088C38.2511 69.3145 38.732 69.7278 39.0915 69.5198Z"
                        fill="currentColor"
                    />
                    <path
                        d="M3.91906 53.6081C13.3073 59.4026 23.9829 65.7725 34.4972 69.9406C35.2076 70.2222 36.1327 69.4214 35.411 68.9315C26.2361 62.702 14.8656 57.4247 4.47386 52.7995C3.83629 52.5158 3.35322 53.2588 3.91906 53.6081Z"
                        fill="currentColor"
                    />
                    <path
                        d="M50.2103 27.6842C48.7132 29.2195 50.3971 34.2728 50.6216 36.0639C50.8921 38.222 51.1669 40.3797 51.4397 42.5377C52.076 47.5726 52.7188 52.6071 53.342 57.6432C53.4695 58.6735 55.2845 58.3966 54.9397 57.459C54.8201 57.1339 54.7007 56.8088 54.5811 56.4836C54.4406 56.1013 53.704 56.0421 53.6003 56.4836C53.5238 56.8088 53.4475 57.1339 53.3711 57.459C53.9036 57.5204 54.4362 57.5818 54.9689 57.6432C54.2476 52.2495 53.5477 46.8538 52.8405 41.4587C52.2309 36.8084 52.2134 31.834 50.4076 27.3989C50.3681 27.3019 50.2038 27.2698 50.1396 27.3691L50.0175 27.5574C49.9529 27.657 50.1179 27.7789 50.2103 27.6842Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.7434 60.2966C19.5292 50.3384 18.6923 38.9348 17.1388 29.0432C17.0237 28.31 15.7764 28.2555 15.7474 29.0432C15.3766 39.1237 15.922 50.445 17.9166 60.392C18.0008 60.8116 18.7134 60.6769 18.7434 60.2966Z"
                        fill="currentColor"
                    />
                    <path
                        d="M17.7258 28.8996C28.0255 23.0356 37.3386 15.4466 46.8814 8.72091C47.8024 8.07187 46.4802 6.94934 45.5669 7.6009C36.1204 14.3403 25.7292 20.7241 17.1378 28.2503C16.7654 28.5765 17.254 29.1683 17.7258 28.8996Z"
                        fill="currentColor"
                    />
                    <path
                        d="M17.3248 9.8231C21.6053 13.2347 27.4019 15.4593 32.2176 18.338C38.2941 21.9702 43.6905 26.2103 49.4874 30.1259C50.3336 30.6974 51.4912 29.7869 50.7026 29.0904C46.0352 24.968 40.3927 21.4778 34.8988 18.1922C29.653 15.0549 23.6889 11.0525 17.4158 9.68995C17.328 9.67093 17.2546 9.76723 17.3248 9.8231Z"
                        fill="currentColor"
                    />
                    <path
                        d="M3.23784 38.2994C7.3432 42.2843 13.58 44.9671 18.9857 47.4811C24.5017 50.0466 30.4117 52.8063 36.5398 54.1132C37.2954 54.2744 37.8156 53.339 37.0849 53.0116C31.4857 50.5028 25.4673 48.7488 19.862 46.2038C14.3302 43.6922 9.18622 40.1413 3.44326 38.0725C3.27056 38.0103 3.10351 38.169 3.23784 38.2994Z"
                        fill="currentColor"
                    />
                    <path
                        d="M37.7873 53.9436C43.5626 51.6107 48.7056 47.6416 53.8337 44.4107C58.4994 41.4712 63.5368 38.7255 67.7354 35.307C68.3495 34.8069 67.5633 33.9569 66.8357 34.3135C61.2316 37.0595 56.1661 40.8515 51.0142 44.1742C46.4454 47.1209 41.2387 49.8742 37.4119 53.529C37.1719 53.7581 37.4695 54.072 37.7873 53.9436Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            nameKz: 'Спорт',
            nameEn: 'Sport',
            nameRu: 'Спорт',
            code: 'sport',
            icon: (
                <svg
                    className="lg:w-14 lg:h-14 w-10 h-10 text-[#2F2F38] dark:text-white"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M30.7366 1.34035C17.6003 0.237686 5.41133 9.45723 1.43203 21.4528C-2.57759 33.5401 2.04603 47.0756 12.6342 54.3634C34.8454 69.6513 64.3851 49.1874 58.81 23.6183C55.71 9.40059 42.3358 0.00311615 27.8282 2.18113e-08C26.7874 -0.000214883 26.7856 1.58772 27.8282 1.5875C43.5343 1.5845 56.9806 13.0124 57.8804 28.6688C58.706 43.0341 47.9434 55.6804 33.5132 57.795C17.8187 60.0948 2.91092 48.3842 1.51536 32.8988C-0.0736459 15.2685 14.1898 3.65135 30.7366 2.08641C31.2229 2.04053 31.2277 1.38163 30.7366 1.34035Z"
                        fill="currentColor"
                    />
                    <path
                        d="M34.1478 12.9339C34.4221 14.8082 36.0508 17.2406 38.275 16.8618C40.3391 16.5103 40.526 14.0475 39.8371 12.5034C39.0184 10.6685 36.7432 9.0488 34.7391 10.2934C33.6435 10.9738 32.9928 13.8438 34.8824 13.8869C35.0617 13.8909 35.1318 13.7067 35.0694 13.5671C34.8429 13.0602 34.4379 12.6914 34.483 12.0832C34.5631 10.9998 35.8252 10.4743 36.7997 10.6668C38.143 10.9322 39.1563 12.2337 39.4503 13.4899C39.84 15.1557 38.6914 16.9311 36.7932 15.9837C35.4473 15.312 35.2279 13.9287 34.5192 12.7801C34.3918 12.5736 34.1165 12.7206 34.1478 12.9339Z"
                        fill="currentColor"
                    />
                    <path
                        d="M34.3181 12.1838C14.9562 8.96675 -0.427885 31.4061 7.52042 48.2227C7.79358 48.8006 8.72558 48.3895 8.55435 47.7949C6.11118 39.3114 6.1693 30.8989 11.6448 23.4707C17.1769 15.9654 25.2453 13.5148 34.2429 12.7291C34.5349 12.7035 34.6563 12.24 34.3181 12.1838Z"
                        fill="currentColor"
                    />
                    <path
                        d="M37.5648 17.0204C39.6581 31.3911 36.9217 45.3299 28.7103 57.4888C28.2688 58.1426 29.3383 58.7489 29.7789 58.1018C37.9939 46.0338 41.2989 31.1217 38.0336 16.8935C37.9633 16.587 37.5219 16.7252 37.5648 17.0204Z"
                        fill="currentColor"
                    />
                    <path
                        d="M38.7475 16.6879C47.7832 19.1379 54.4908 23.2855 58.7876 31.7438C59.1789 32.514 60.2655 31.8376 59.94 31.0826C56.5234 23.1576 47.8825 16.1407 38.858 15.8869C38.3862 15.8737 38.2985 16.5661 38.7475 16.6879Z"
                        fill="currentColor"
                    />
                    <path
                        d="M38.7371 10.9388C39.3809 8.32545 40.1415 6.24916 42.6755 4.85754C43.3249 4.50091 42.7518 3.5579 42.0955 3.8838C39.652 5.09715 37.431 8.15257 38.1745 10.9388C38.2464 11.2079 38.669 11.2151 38.7371 10.9388Z"
                        fill="currentColor"
                    />
                    <path
                        d="M34.7465 11.6978C30.4393 6.66425 23.1152 3.23566 16.3186 4.77943C15.8534 4.88506 15.9687 5.57114 16.4289 5.58027C23.4219 5.71975 29.1896 7.08375 34.3402 12.0965C34.607 12.3561 34.9809 11.9718 34.7465 11.6978Z"
                        fill="currentColor"
                    />
                    <path
                        d="M37.8823 10.4272C38.2143 7.31481 37.4021 3.03648 34.4497 1.23632C34.188 1.07665 33.8647 1.39493 34.0265 1.65174C34.812 2.89894 35.8518 3.91061 36.4734 5.27525C37.2022 6.87533 37.5916 8.6787 37.5464 10.4272C37.5408 10.6433 37.8602 10.6337 37.8823 10.4272Z"
                        fill="currentColor"
                    />
                    <path
                        d="M7.30909 45.5713C7.11608 45.3543 6.96314 45.113 6.85016 44.8471L6.39229 45.1099C7.84335 46.9561 9.4962 48.6595 11.0819 50.3946C12.6452 52.105 14.1348 54.0311 15.9989 55.4329C16.1618 55.5553 16.369 55.3219 16.2711 55.1658C15.1082 53.3129 13.4081 51.7529 11.9186 50.1496C10.2444 48.3475 8.61563 46.469 6.80876 44.7945C6.53462 44.5405 6.17795 44.971 6.48745 45.2031L7.08697 45.7395C7.1947 45.8512 7.40631 45.7001 7.30909 45.5713Z"
                        fill="currentColor"
                    />
                    <path
                        d="M6.17623 40.6828C8.29895 43.6155 10.6291 46.4038 12.9116 49.2171C15.4124 52.2996 17.7709 55.8342 20.7761 58.4453C20.9164 58.5672 21.135 58.4143 21.0398 58.2455C19.2893 55.145 16.6272 52.4319 14.3617 49.6769C11.7963 46.5573 9.27674 43.3844 6.5372 40.4096C6.36499 40.2226 6.02362 40.472 6.17623 40.6828Z"
                        fill="currentColor"
                    />
                    <path
                        d="M6.69926 38.231C12.0109 45.0965 17.3131 52.0686 23.0797 58.5726C23.3753 58.906 23.9826 58.4584 23.7113 58.0943C18.525 51.1332 12.7752 44.5101 7.12963 37.9052C6.93213 37.674 6.51041 37.9869 6.69926 38.231Z"
                        fill="currentColor"
                    />
                    <path
                        d="M6.8133 35.1357C12.3886 43.8303 19.5484 51.7596 25.9986 59.8386C26.3747 60.3096 27.0344 59.648 26.6674 59.1822C20.2948 51.0929 14.2396 42.3653 7.04935 34.957C6.93264 34.8367 6.72178 34.9928 6.8133 35.1357Z"
                        fill="currentColor"
                    />
                    <path
                        d="M6.93197 32.3854C13.7251 41.5962 21.2993 50.4014 28.7599 59.0962C29.1609 59.5635 29.8063 58.8981 29.4349 58.4337C22.3053 49.5204 15.0927 40.4735 7.31372 32.0963C7.13111 31.8997 6.7683 32.1635 6.93197 32.3854Z"
                        fill="currentColor"
                    />
                    <path
                        d="M7.93923 30.1999C15.187 39.0574 22.6346 47.7697 30.1844 56.3805C30.6139 56.8704 31.3168 56.1637 30.9031 55.6751C23.5143 46.9476 16.0078 38.3014 8.32041 29.8257C8.08591 29.567 7.7264 29.9398 7.93923 30.1999Z"
                        fill="currentColor"
                    />
                    <path
                        d="M8.83167 27.5085C15.1763 36.7693 23.2891 45.6264 30.9242 53.888C31.2218 54.2099 31.8275 53.7696 31.5489 53.415C24.6014 44.5714 17.1567 35.1602 8.98439 27.3929C8.90764 27.32 8.76817 27.4158 8.83167 27.5085Z"
                        fill="currentColor"
                    />
                    <path
                        d="M9.54675 23.802C16.4761 33.6738 24.9422 42.7205 32.6576 52.0104C33.0281 52.4563 33.6685 51.8208 33.3014 51.3786C25.6097 42.1103 18.3172 32.1741 9.88681 23.5445C9.72029 23.374 9.40475 23.5998 9.54675 23.802Z"
                        fill="currentColor"
                    />
                    <path
                        d="M11.4067 21.8931C18.805 31.5529 25.8662 41.7815 34.0291 50.8329C34.3129 51.1475 34.8663 50.7343 34.6261 50.3808C27.7911 40.325 19.5149 31.0154 11.8856 21.5304C11.6733 21.2666 11.1983 21.6211 11.4067 21.8931Z"
                        fill="currentColor"
                    />
                    <path
                        d="M13.1251 19.8115C20.1839 29.4161 26.9567 39.4047 34.6175 48.5574C34.894 48.8878 35.4597 48.4566 35.2214 48.1002C28.6154 38.2205 20.9308 28.9294 13.7051 19.4787C13.4503 19.1453 12.8699 19.4642 13.1251 19.8115Z"
                        fill="currentColor"
                    />
                    <path
                        d="M14.6497 18.697C21.427 27.4781 28.1887 36.3292 35.3742 44.7935C35.7408 45.2254 36.4101 44.5883 36.0101 44.1693C35.8689 44.0214 35.7276 43.8734 35.5863 43.7254C35.3792 43.5086 34.988 43.733 35.0767 44.0167C33.7053 39.6284 29.2327 35.5999 26.3087 31.9748C22.6176 27.3989 18.894 22.8517 15.1356 18.329C14.916 18.0648 14.4371 18.4216 14.6497 18.697Z"
                        fill="currentColor"
                    />
                    <path
                        d="M16.3876 17.4641C22.6218 26.0981 29.2325 34.5125 35.8057 42.9005C36.1694 43.3647 36.9884 42.9153 36.6224 42.432C30.1672 33.9063 23.6982 25.3424 16.9082 17.0699C16.6741 16.7847 16.1698 17.1626 16.3876 17.4641Z"
                        fill="currentColor"
                    />
                    <path
                        d="M19.9606 17.2971C19.6938 16.9737 19.4269 16.6504 19.1601 16.3269C18.9699 16.0961 18.5818 16.3955 18.7426 16.6432C24.1437 24.962 30.1659 32.9457 35.9821 40.989C36.2817 41.4034 36.9846 41.0107 36.6843 40.5862C33.8126 36.5259 30.9185 32.4805 28.018 28.4398C26.5674 26.419 25.1179 24.3972 23.6613 22.3803C22.5877 20.8935 21.4164 18.4529 19.8641 17.4197C19.9445 17.4732 20.0132 17.3609 19.9606 17.2971Z"
                        fill="currentColor"
                    />
                    <path
                        d="M20.2357 15.1759C25.7408 22.806 31.0065 30.7817 37.0546 38.0075C37.3256 38.3313 37.8727 37.9106 37.6445 37.5607C32.5253 29.7109 26.4259 22.3508 20.7471 14.8825C20.5234 14.5883 20.013 14.8672 20.2357 15.1759Z"
                        fill="currentColor"
                    />
                    <path
                        d="M23.4386 15.023C27.6231 21.8496 31.9887 29.1371 37.1506 35.2916C37.4379 35.634 37.9516 35.1972 37.7544 34.8343C33.9558 27.84 28.7515 21.0994 23.9498 14.7297C23.7288 14.4364 23.2371 14.6944 23.4386 15.023Z"
                        fill="currentColor"
                    />
                    <path
                        d="M26.2615 14.0515C27.1572 17.1931 30.2276 20.4115 32.152 23.1506C34.137 25.9759 35.9824 28.9856 38.2878 31.5698C38.523 31.8335 38.9253 31.497 38.7667 31.2071C36.9164 27.8232 34.3827 24.7226 32.1481 21.5726C30.1446 18.7483 28.2359 15.8243 25.9805 13.1857C25.7935 12.967 25.4228 13.2514 25.5784 13.4903C25.7225 13.7118 25.8668 13.9335 26.0111 14.1551C26.0929 14.2808 26.3045 14.2026 26.2615 14.0515Z"
                        fill="currentColor"
                    />
                    <path
                        d="M27.9963 13.4281C29.5837 16.1776 31.802 18.6323 33.5809 21.28C35.1654 23.6386 36.369 26.4392 38.2824 28.5356C38.4455 28.7143 38.7411 28.5252 38.6813 28.3077C37.8993 25.4617 35.7712 22.7849 34.1137 20.3574C32.4282 17.8892 30.6339 15.1364 28.3504 13.16C28.1627 12.9977 27.8656 13.2016 27.9963 13.4281Z"
                        fill="currentColor"
                    />
                    <path
                        d="M29.7136 12.2167C32.3922 16.45 35.1329 20.9552 38.4069 24.7692C38.5807 24.9718 38.8863 24.7134 38.7678 24.496C36.3844 20.1241 33.1318 15.963 30.1334 11.9758C29.9521 11.7348 29.5447 11.9498 29.7136 12.2167Z"
                        fill="currentColor"
                    />
                    <path
                        d="M32.4279 12.6098C34.1752 15.2241 35.7483 18.1642 37.9382 20.4489C38.082 20.5988 38.3014 20.4086 38.2159 20.2386C36.8119 17.4446 34.5579 14.9675 32.6874 12.461C32.5755 12.3111 32.3199 12.4483 32.4279 12.6098Z"
                        fill="currentColor"
                    />
                    <path
                        d="M39.5506 13.5115C39.7184 14.0602 40.0776 14.5272 40.3933 15.0027C40.6917 15.4522 40.9523 15.9161 41.3918 16.2465C41.5564 16.3702 41.7683 16.1667 41.7229 15.9967C41.5822 15.4693 41.2172 15.0379 40.9089 14.5941C40.5993 14.1486 40.3112 13.6669 39.883 13.3216C39.7399 13.2062 39.4889 13.3096 39.5506 13.5115Z"
                        fill="currentColor"
                    />
                    <path
                        d="M38.1431 9.09347C39.2588 10.6565 40.4824 12.1333 41.695 13.6242C43.0129 15.2445 44.2466 17.1253 45.8343 18.4912C46.0525 18.6788 46.3929 18.4439 46.2438 18.1809C45.3136 16.5405 43.8743 15.1162 42.6646 13.6648C41.3012 12.0293 39.9628 10.3745 38.4971 8.82538C38.3262 8.64465 37.9943 8.88512 38.1431 9.09347Z"
                        fill="currentColor"
                    />
                    <path
                        d="M39.3219 6.4367C42.2634 11.0569 45.2449 16.1319 48.9387 20.2095C49.1872 20.4839 49.601 20.1344 49.4385 19.8311C46.8657 15.0286 43.079 10.5141 39.7264 6.20461C39.5493 5.97691 39.1575 6.17837 39.3219 6.4367Z"
                        fill="currentColor"
                    />
                    <path
                        d="M40.9863 4.6304C44.4457 11.0819 48.8364 17.5465 53.1838 23.4565C53.4711 23.8472 54.1112 23.5056 53.8555 23.0713C50.1162 16.72 45.9088 10.1704 41.2986 4.3939C41.1541 4.21284 40.8859 4.44333 40.9863 4.6304Z"
                        fill="currentColor"
                    />
                    <path
                        d="M45.5813 5.85708C48.8975 12.1576 51.8985 19.2539 56.1071 25.0209C56.2382 25.2005 56.5974 25.0998 56.5029 24.8572C53.9064 18.1867 49.5485 11.8462 46.001 5.61627C45.8476 5.34701 45.4382 5.58523 45.5813 5.85708Z"
                        fill="currentColor"
                    />
                    <path
                        d="M51.0437 11.1741C53.1523 15.9965 55.1035 21.1709 57.9262 25.6373C58.0004 25.7547 58.2062 25.6806 58.1605 25.5404C56.523 20.5149 53.7728 15.6901 51.3948 10.9726C51.2767 10.7383 50.9431 10.9438 51.0437 11.1741Z"
                        fill="currentColor"
                    />
                    <path
                        d="M21.6469 2.78096C21.6311 3.36765 22.3276 3.93683 22.6805 4.36191C23.1591 4.93839 23.6264 5.59986 24.2772 5.99777C24.4022 6.07416 24.6031 5.94446 24.5434 5.79693C24.2799 5.14598 23.7623 4.60948 23.3032 4.08124C22.9108 3.62983 22.4301 2.76763 21.7978 2.66803C21.721 2.65599 21.6491 2.69854 21.6469 2.78096Z"
                        fill="currentColor"
                    />
                    <path
                        d="M22.9667 3.09424C23.405 3.63774 23.8433 4.18134 24.2817 4.72484C24.7133 5.26006 25.1244 5.85438 25.6707 6.28279C25.872 6.44064 26.1518 6.24915 26.0316 6.00943C25.73 5.40812 25.2396 4.89471 24.8095 4.37862C24.3369 3.81149 23.8643 3.24425 23.3917 2.67711C23.1453 2.3814 22.7303 2.801 22.9667 3.09424Z"
                        fill="currentColor"
                    />
                    <path
                        d="M24.5417 1.9822C25.8287 3.61698 27.0288 5.47934 28.5905 6.87354C28.6982 6.96971 28.8612 6.84925 28.7919 6.72117C27.7897 4.86825 26.2339 3.25551 24.9229 1.60794C24.7092 1.33931 24.3325 1.71636 24.5417 1.9822Z"
                        fill="currentColor"
                    />
                    <path
                        d="M26.5205 1.68633C28.1734 3.95917 29.7459 6.33075 31.6583 8.40362C31.7743 8.52923 31.979 8.36794 31.8944 8.22492C30.4751 5.82519 28.6615 3.64722 26.9708 1.42801C26.7734 1.16895 26.3235 1.41543 26.5205 1.68633Z"
                        fill="currentColor"
                    />
                    <path
                        d="M27.9506 0.970355C30.155 4.70488 32.5327 8.59627 35.2804 11.9704C35.4754 12.2099 35.8311 11.9047 35.6967 11.655C33.6606 7.86646 30.9644 4.17181 28.378 0.725162C28.1935 0.479203 27.7869 0.693128 27.9506 0.970355Z"
                        fill="currentColor"
                    />
                    <path
                        d="M30.2726 0.819292C32.1362 4.13818 33.8257 7.85754 36.2145 10.8418C36.3566 11.0194 36.6897 10.8268 36.606 10.6182C35.189 7.08689 32.7688 3.77628 30.7915 0.521541C30.5934 0.195208 30.0856 0.486296 30.2726 0.819292Z"
                        fill="currentColor"
                    />
                    <path
                        d="M32.2964 1.01461C33.8379 3.92475 35.1848 7.22622 37.1997 9.85097C37.2903 9.96906 37.5248 9.90813 37.4663 9.74072C36.3686 6.60698 34.3333 3.67385 32.7238 0.769404C32.571 0.493896 32.1498 0.737816 32.2964 1.01461Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
    ];

    const UserLang = getCookie('UserLang');

    switch (UserLang?.toLocaleLowerCase()) {
        case 'kk':
            return data.map((x) => {
                return { ...x, name: x.nameKz };
            });
        case 'en':
            return data.map((x) => {
                return { ...x, name: x.nameEn };
            });

        default:
            return data.map((x) => {
                return { ...x, name: x.nameRu };
            });
            break;
    }
};

export default categories;
