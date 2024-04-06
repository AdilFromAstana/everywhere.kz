import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import WhiteMonoLogo from '@/assets/kazticket-logo-white-mono.svg';
import Logo from '@/assets/kazticket-logo.svg';

interface FooterProps {
    locale: any;
    pages: any[];
}

const Footer = ({ pages, locale }: FooterProps) => {
    return (
        <footer id="footer" className="bg-white dark:bg-black shadow-footer mt-2">
            <div className="container mx-auto flex lg:px-0 lg:flex-row px-4 py-10 flex-col justify-between lg:gap-0 gap-8">
                <div className="flex flex-col items-start gap-8">
                    <Image
                        src={WhiteMonoLogo}
                        alt="Kazticket.kz Logo"
                        className="dark:block hidden h-8 w-auto cursor-pointer"
                        priority
                    />
                    <Image
                        src={Logo}
                        alt="Kazticket.kz Logo"
                        className="dark:hidden block h-8 w-auto cursor-pointer"
                        priority
                    />
                    <div className="flex gap-8">
                        <Link href="https://apps.apple.com/kz/app/kazticket-kz/id6476543740" target="_blank">
                            <svg
                                width="156"
                                height="47"
                                viewBox="0 0 156 47"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="155.678" height="46.6102" rx="23.3051" fill="#2F2F38" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M76.6365 16.7804H75.7602V10.0312H76.6365V16.7804ZM51.178 16.7804H53.4712C54.3599 16.7804 55.1088 16.4899 55.7178 15.9088C56.3269 15.3277 56.6314 14.5214 56.6314 13.4897C56.6314 12.4519 56.33 11.6393 55.7271 11.052C55.1243 10.4647 54.3785 10.1711 53.4898 10.1711H51.178V16.7804ZM53.4432 15.9694H52.0915V10.9821H53.4619C54.1082 10.9821 54.6411 11.1996 55.0606 11.6346C55.4801 12.0697 55.6898 12.688 55.6898 13.4897C55.6898 14.2852 55.477 14.8973 55.0513 15.3262C54.6256 15.755 54.0896 15.9694 53.4432 15.9694ZM58.7195 15.7177C58.993 15.9974 59.3254 16.1372 59.717 16.1372C60.1085 16.1372 60.4394 15.9958 60.7098 15.713C60.9801 15.4303 61.1153 15.0372 61.1153 14.5338C61.1153 14.0366 60.9801 13.6466 60.7098 13.3639C60.4394 13.0811 60.1085 12.9397 59.717 12.9397C59.3254 12.9397 58.9945 13.0811 58.7242 13.3639C58.4538 13.6466 58.3187 14.0366 58.3187 14.5338C58.3187 15.0372 58.4523 15.4318 58.7195 15.7177ZM59.717 12.1567C59.052 12.1567 58.502 12.3835 58.067 12.8372C57.6381 13.2846 57.4237 13.8502 57.4237 14.5338C57.4237 15.2236 57.6381 15.7938 58.067 16.2444C58.4958 16.695 59.0458 16.9202 59.717 16.9202C60.3882 16.9202 60.9381 16.695 61.367 16.2444C61.7958 15.7938 62.0102 15.2236 62.0102 14.5338C62.0102 13.8502 61.7942 13.2831 61.3623 12.8325C60.9304 12.382 60.3819 12.1567 59.717 12.1567ZM65.6551 12.2965H66.5593L67.7246 15.6711L68.7127 12.2965H69.6356L68.1814 16.7804H67.2771L66.0839 13.3685L64.9187 16.7804H63.9958L62.5229 12.2965H63.4831L64.4898 15.6711L65.6551 12.2965ZM71.3975 16.7804V14.1889C71.3975 13.8346 71.4891 13.541 71.6725 13.3079C71.8558 13.0749 72.1122 12.9584 72.4415 12.9584C73.1376 12.9584 73.4856 13.3344 73.4856 14.0863V16.7804H74.3619V13.9372C74.3619 13.4151 74.2236 12.9894 73.947 12.6601C73.6705 12.3307 73.2743 12.166 72.7585 12.166C72.137 12.166 71.6771 12.4239 71.3788 12.9397V12.2965H70.5212V16.7804H71.3975ZM80.0483 16.1372C79.6568 16.1372 79.3243 15.9974 79.0509 15.7177C78.7836 15.4318 78.65 15.0372 78.65 14.5338C78.65 14.0366 78.7852 13.6466 79.0555 13.3639C79.3259 13.0811 79.6568 12.9397 80.0483 12.9397C80.4398 12.9397 80.7708 13.0811 81.0411 13.3639C81.3115 13.6466 81.4466 14.0366 81.4466 14.5338C81.4466 15.0372 81.3115 15.4303 81.0411 15.713C80.7708 15.9958 80.4398 16.1372 80.0483 16.1372ZM78.3983 12.8372C78.8333 12.3835 79.3833 12.1567 80.0483 12.1567C80.7133 12.1567 81.2617 12.382 81.6937 12.8325C82.1256 13.2831 82.3415 13.8502 82.3415 14.5338C82.3415 15.2236 82.1271 15.7938 81.6983 16.2444C81.2695 16.695 80.7195 16.9202 80.0483 16.9202C79.3771 16.9202 78.8271 16.695 78.3983 16.2444C77.9695 15.7938 77.7551 15.2236 77.7551 14.5338C77.7551 13.8502 77.9695 13.2846 78.3983 12.8372ZM83.5534 14.6503C83.3048 14.8834 83.1805 15.1925 83.1805 15.5779C83.1805 15.9445 83.3204 16.2599 83.6 16.524C83.8797 16.7882 84.2401 16.9202 84.6814 16.9202C85.0418 16.9202 85.3417 16.8457 85.5809 16.6965C85.8202 16.5474 86.002 16.3733 86.1263 16.1745C86.1263 16.392 86.1418 16.594 86.1729 16.7804H87.0305C86.9932 16.5567 86.9746 16.3112 86.9746 16.044V13.7974C86.9746 13.3188 86.8223 12.9257 86.5178 12.6181C86.2133 12.3105 85.7441 12.1567 85.1102 12.1567C84.6254 12.1567 84.2091 12.2918 83.861 12.5622C83.513 12.8325 83.3172 13.1821 83.2737 13.6109L84.1127 13.8067C84.1438 13.5332 84.2463 13.3142 84.4204 13.1495C84.5944 12.9848 84.8305 12.9024 85.1288 12.9024C85.452 12.9024 85.6944 12.977 85.8559 13.1262C86.0175 13.2753 86.0983 13.468 86.0983 13.7041C86.0983 13.8968 85.9833 14.0087 85.7534 14.0397L84.5415 14.2168C84.1314 14.2728 83.802 14.4173 83.5534 14.6503ZM84.8026 16.1838C85.1941 16.1838 85.5079 16.0781 85.7441 15.8668C85.9802 15.6555 86.0983 15.32 86.0983 14.8601V14.655L84.728 14.8601C84.5291 14.8911 84.3706 14.9626 84.2526 15.0745C84.1345 15.1863 84.0754 15.3386 84.0754 15.5313C84.0754 15.7053 84.1422 15.8575 84.2759 15.988C84.4095 16.1185 84.585 16.1838 84.8026 16.1838ZM89.2072 15.6804C88.9742 15.3821 88.8576 14.9968 88.8576 14.5245C88.8576 14.0584 88.9788 13.6793 89.2212 13.3872C89.4636 13.0951 89.7836 12.949 90.1814 12.949C90.5791 12.949 90.8929 13.092 91.1229 13.3779C91.3528 13.6637 91.4678 14.0397 91.4678 14.5058C91.4678 14.9781 91.3497 15.3666 91.1136 15.6711C90.8774 15.9756 90.5636 16.1279 90.172 16.1279C89.7619 16.1279 89.4403 15.9787 89.2072 15.6804ZM91.48 16.3417L91.4771 16.0999C91.3591 16.3298 91.1804 16.5209 90.9411 16.6732C90.7018 16.8255 90.4175 16.9016 90.0881 16.9016C89.448 16.9016 88.9338 16.6763 88.5453 16.2257C88.1569 15.7752 87.9627 15.2081 87.9627 14.5245C87.9627 13.8719 88.1616 13.3173 88.5593 12.8605C88.9571 12.4037 89.4667 12.1753 90.0881 12.1753C90.4548 12.1753 90.7531 12.2483 90.9831 12.3944C91.213 12.5404 91.3715 12.7191 91.4585 12.9304V10.0312H92.3254V15.9507C92.3254 16.2553 92.341 16.5318 92.372 16.7804H91.5237C91.5004 16.6499 91.4859 16.5037 91.48 16.3417ZM98.0678 16.1372C97.6763 16.1372 97.3438 15.9974 97.0704 15.7177C96.8031 15.4318 96.6695 15.0372 96.6695 14.5338C96.6695 14.0366 96.8047 13.6466 97.075 13.3639C97.3454 13.0811 97.6763 12.9397 98.0678 12.9397C98.4593 12.9397 98.7903 13.0811 99.0606 13.3639C99.3309 13.6466 99.4661 14.0366 99.4661 14.5338C99.4661 15.0372 99.3309 15.4303 99.0606 15.713C98.7903 15.9958 98.4593 16.1372 98.0678 16.1372ZM96.4178 12.8372C96.8528 12.3835 97.4028 12.1567 98.0678 12.1567C98.7328 12.1567 99.2812 12.382 99.7131 12.8325C100.145 13.2831 100.361 13.8502 100.361 14.5338C100.361 15.2236 100.147 15.7938 99.7178 16.2444C99.289 16.695 98.739 16.9202 98.0678 16.9202C97.3966 16.9202 96.8466 16.695 96.4178 16.2444C95.989 15.7938 95.7746 15.2236 95.7746 14.5338C95.7746 13.8502 95.989 13.2846 96.4178 12.8372ZM102.356 16.7804V14.1889C102.356 13.8346 102.448 13.541 102.631 13.3079C102.814 13.0749 103.071 12.9584 103.4 12.9584C104.096 12.9584 104.444 13.3344 104.444 14.0863V16.7804H105.32V13.9372C105.32 13.4151 105.182 12.9894 104.906 12.6601C104.629 12.3307 104.233 12.166 103.717 12.166C103.095 12.166 102.636 12.4239 102.337 12.9397V12.2965H101.48V16.7804H102.356ZM110.224 10.8796V12.2965H111.193V13.0889H110.224V15.4194C110.224 15.6307 110.272 15.7861 110.368 15.8855C110.465 15.9849 110.625 16.0346 110.848 16.0346C110.979 16.0346 111.094 16.0222 111.193 15.9974V16.7431C111.044 16.799 110.845 16.827 110.597 16.827C110.211 16.827 109.907 16.7151 109.683 16.4914C109.459 16.2677 109.347 15.9539 109.347 15.5499V13.0889H108.49V12.2965H108.732C108.962 12.2965 109.135 12.2328 109.25 12.1054C109.365 11.978 109.422 11.8118 109.422 11.6067V10.8796H110.224ZM113.235 16.7804V14.1423C113.247 13.7942 113.344 13.5099 113.524 13.2893C113.704 13.0687 113.956 12.9584 114.279 12.9584C114.975 12.9584 115.323 13.3344 115.323 14.0863V16.7804H116.199V13.9372C116.199 13.4151 116.061 12.9894 115.784 12.6601C115.508 12.3307 115.112 12.166 114.596 12.166C113.987 12.166 113.533 12.3835 113.235 12.8185V10.0312H112.358V16.7804H113.235ZM118.166 14.077H120.618C120.605 13.7414 120.494 13.4664 120.282 13.252C120.071 13.0376 119.773 12.9304 119.387 12.9304C119.039 12.9304 118.753 13.0438 118.53 13.2707C118.306 13.4975 118.185 13.7663 118.166 14.077ZM121.503 15.5033L120.748 15.2423C120.549 15.8451 120.13 16.1465 119.49 16.1465C119.111 16.1465 118.792 16.0191 118.534 15.7643C118.276 15.5095 118.144 15.1832 118.138 14.7855H121.513C121.525 14.7109 121.531 14.6177 121.531 14.5058C121.531 13.7911 121.342 13.2209 120.963 12.7952C120.584 12.3695 120.055 12.1567 119.378 12.1567C118.794 12.1567 118.29 12.3804 117.868 12.8279C117.445 13.2753 117.234 13.8409 117.234 14.5245C117.234 15.2578 117.453 15.8404 117.891 16.2724C118.329 16.7043 118.862 16.9202 119.49 16.9202C119.993 16.9202 120.422 16.7882 120.776 16.524C121.131 16.2599 121.373 15.9197 121.503 15.5033Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M58.8406 34.492H60.7945L56.6779 23.9171H54.6046L50.488 34.492H52.3823L53.3667 31.8371H57.8413L58.8406 34.492ZM55.604 25.8561L57.2148 30.1815H53.9931L55.604 25.8561ZM63.7775 37.3259V33.6717C64.1504 34.2235 64.9409 34.671 65.985 34.671C68.0731 34.671 69.4006 33.0303 69.4006 30.8527C69.4006 28.7049 68.1924 27.0642 66.0446 27.0642C64.926 27.0642 64.0907 27.5862 63.7328 28.2127V27.2283H62.0623V37.3259H63.7775ZM67.6704 30.8527C67.6704 32.2398 66.865 33.1347 65.7165 33.1347C64.583 33.1347 63.7626 32.2398 63.7626 30.8527C63.7626 29.4954 64.583 28.6005 65.7165 28.6005C66.8799 28.6005 67.6704 29.4954 67.6704 30.8527ZM72.7863 37.3259V33.6717C73.1592 34.2235 73.9497 34.671 74.9938 34.671C77.0819 34.671 78.4094 33.0303 78.4094 30.8527C78.4094 28.7049 77.2013 27.0642 75.0535 27.0642C73.9348 27.0642 73.0996 27.5862 72.7416 28.2127V27.2283H71.0711V37.3259H72.7863ZM76.6792 30.8527C76.6792 32.2398 75.8738 33.1347 74.7253 33.1347C73.5918 33.1347 72.7714 32.2398 72.7714 30.8527C72.7714 29.4954 73.5918 28.6005 74.7253 28.6005C75.8887 28.6005 76.6792 29.4954 76.6792 30.8527ZM90.8785 26.393C90.6399 25.2147 89.6704 23.6934 87.1796 23.6934C85.2108 23.6934 83.585 25.1551 83.585 26.93C83.585 28.511 84.6589 29.57 86.2697 29.8981L87.7613 30.2113C88.6711 30.4052 89.1782 30.9571 89.1782 31.6432C89.1782 32.4635 88.5219 33.1049 87.2541 33.1049C85.7328 33.1049 84.9423 32.0906 84.8379 30.9869L83.1674 31.4642C83.3314 32.9856 84.5694 34.7157 87.2541 34.7157C89.6704 34.7157 90.9979 33.1496 90.9979 31.509C90.9979 30.0174 89.9985 28.8391 88.1341 28.4662L86.6128 28.153C85.7924 27.974 85.3748 27.4669 85.3748 26.7957C85.3748 25.9903 86.1206 25.2744 87.1945 25.2744C88.6114 25.2744 89.1633 26.2439 89.2677 26.9001L90.8785 26.393ZM94.9057 25.0059H93.3396V26.0947C93.3396 26.7361 92.9965 27.2283 92.2209 27.2283H91.848V28.7645H93.1904V32.4188C93.1904 33.7761 94.0257 34.5815 95.368 34.5815C95.9945 34.5815 96.3226 34.4622 96.427 34.4174V32.9856L96.236 33.0153C96.1178 33.0306 95.9668 33.0452 95.8304 33.0452C95.1891 33.0452 94.9057 32.7767 94.9057 32.1354V28.7645H96.4121V27.2283H94.9057V25.0059ZM101.349 33.1645C100.29 33.1645 99.3206 32.3591 99.3206 30.8527C99.3206 29.3462 100.29 28.5706 101.349 28.5706C102.423 28.5706 103.378 29.3462 103.378 30.8527C103.378 32.374 102.423 33.1645 101.349 33.1645ZM101.349 27.0045C99.1863 27.0045 97.5904 28.6303 97.5904 30.8527C97.5904 33.09 99.1863 34.7157 101.349 34.7157C103.527 34.7157 105.123 33.09 105.123 30.8527C105.123 28.6303 103.527 27.0045 101.349 27.0045ZM111.044 27.1835C110.969 27.1686 110.79 27.1388 110.582 27.1388C109.627 27.1388 108.822 27.6012 108.479 28.3917V27.2283H106.793V34.492H108.523V31.0317C108.523 29.6744 109.135 28.8988 110.477 28.8988C110.656 28.8988 110.85 28.9137 111.044 28.9435V27.1835ZM113.669 30.0622C113.729 29.2866 114.355 28.4513 115.444 28.4513C116.637 28.4513 117.204 29.212 117.234 30.0622H113.669ZM117.428 31.9564L118.889 32.4188C118.502 33.6866 117.353 34.7157 115.608 34.7157C113.639 34.7157 111.894 33.2839 111.894 30.8229C111.894 28.5259 113.594 27.0045 115.429 27.0045C117.666 27.0045 118.979 28.4812 118.979 30.7781C118.979 31.0615 118.949 31.3001 118.934 31.33H113.624C113.669 32.4337 114.534 33.2242 115.608 33.2242C116.652 33.2242 117.189 32.6723 117.428 31.9564Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M29.2655 13.5517C30.0757 12.6781 30.624 11.4645 30.4743 10.2539C29.3058 10.2959 27.8902 10.9442 27.053 11.8175C26.3006 12.5914 25.6431 13.8274 25.8186 15.0136C27.123 15.1034 28.4536 14.4243 29.2655 13.5517ZM31.7524 21.9083C31.7272 19.1948 33.8852 17.8928 33.9821 17.8288C32.7692 15.9871 30.8793 15.7348 30.2069 15.7067C28.5992 15.5366 27.0698 16.6879 26.2532 16.6879C25.4396 16.6879 24.181 15.7294 22.847 15.7548C21.094 15.7836 19.4782 16.8119 18.5768 18.4419C16.7555 21.72 18.1096 26.5776 19.8852 29.2363C20.7526 30.5383 21.7862 31.9986 23.1433 31.9454C24.4521 31.8932 24.9461 31.0681 26.527 31.0681C28.1068 31.0681 28.5514 31.9454 29.9341 31.919C31.3411 31.8932 32.2327 30.5922 33.0941 29.2868C34.0893 27.7777 34.499 26.3158 34.5239 26.2416C34.4923 26.2254 31.781 25.1496 31.7524 21.9083Z"
                                    fill="white"
                                />
                            </svg>
                        </Link>
                        <Link href="https://play.google.com/store/apps/details?id=com.kazticket.kz" target="_blank">
                            <svg
                                width="156"
                                height="47"
                                viewBox="0 0 156 47"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="0.322021" width="155.678" height="46.6102" rx="23.3051" fill="#2F2F38" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M69.0348 11.5304C69.0348 11.7044 69.0938 11.8535 69.2119 11.9778C69.3362 12.0959 69.4854 12.155 69.6594 12.155C69.8334 12.155 69.9825 12.0944 70.1068 11.9732C70.2311 11.852 70.2933 11.7044 70.2933 11.5304C70.2933 11.3502 70.2311 11.1995 70.1068 11.0783C69.9825 10.9571 69.8334 10.8965 69.6594 10.8965C69.4854 10.8965 69.3378 10.9586 69.2166 11.0829C69.0954 11.2072 69.0348 11.3564 69.0348 11.5304ZM56.4873 17.7109H57.2238V14.4761H54.0636V15.2965H56.3568C56.3444 15.4829 56.2993 15.6694 56.2217 15.8558C56.144 16.0422 56.029 16.2271 55.8768 16.4105C55.7245 16.5938 55.5132 16.7414 55.2429 16.8533C54.9725 16.9651 54.6633 17.0211 54.3153 17.0211C53.6814 17.0211 53.1392 16.7927 52.6886 16.3359C52.238 15.8791 52.0128 15.2343 52.0128 14.4016C52.0128 13.575 52.2427 12.9349 52.7026 12.4812C53.1625 12.0276 53.7125 11.8007 54.3526 11.8007C54.8622 11.8007 55.3019 11.9328 55.6717 12.1969C56.0414 12.461 56.3009 12.8324 56.4501 13.3109L57.2797 12.9567C57.0871 12.3538 56.7282 11.8706 56.203 11.5071C55.6779 11.1435 55.0611 10.9617 54.3526 10.9617C53.7933 10.9617 53.2697 11.0891 52.7818 11.3439C52.294 11.5987 51.8885 11.9934 51.5653 12.5278C51.2421 13.0623 51.0806 13.6869 51.0806 14.4016C51.0806 15.1163 51.2344 15.7408 51.542 16.2753C51.8496 16.8098 52.2427 17.2059 52.7212 17.4639C53.1998 17.7218 53.7218 17.8507 54.2873 17.8507C54.8032 17.8507 55.2444 17.7451 55.6111 17.5338C55.9777 17.3225 56.2419 17.0708 56.4034 16.7787L56.4873 17.7109ZM61.5585 15.0075H59.1068C59.1255 14.6968 59.2467 14.428 59.4704 14.2011C59.6941 13.9743 59.98 13.8609 60.328 13.8609C60.7133 13.8609 61.0116 13.9681 61.2229 14.1825C61.4342 14.3969 61.5461 14.6719 61.5585 15.0075ZM61.689 16.1728L62.4441 16.4338C62.3136 16.8502 62.0712 17.1904 61.717 17.4545C61.3628 17.7187 60.934 17.8507 60.4306 17.8507C59.8029 17.8507 59.27 17.6348 58.8318 17.2028C58.3937 16.7709 58.1746 16.1883 58.1746 15.455C58.1746 14.7713 58.3859 14.2058 58.8085 13.7583C59.2311 13.3109 59.7345 13.0872 60.3187 13.0872C60.9961 13.0872 61.5243 13.3 61.9034 13.7257C62.2825 14.1514 62.4721 14.7216 62.4721 15.4363C62.4721 15.5482 62.4659 15.6414 62.4534 15.716H59.0789C59.0851 16.1137 59.2171 16.44 59.4751 16.6948C59.733 16.9496 60.0515 17.077 60.4306 17.077C61.0707 17.077 61.4902 16.7756 61.689 16.1728ZM64.7653 13.227V11.81H63.9636V12.5372C63.9636 12.7422 63.9061 12.9085 63.7912 13.0359C63.6762 13.1633 63.5037 13.227 63.2738 13.227H63.0314V14.0194H63.889V16.4804C63.889 16.8843 64.0009 17.1982 64.2246 17.4219C64.4484 17.6456 64.7529 17.7575 65.1382 17.7575C65.3868 17.7575 65.5856 17.7295 65.7348 17.6736V16.9278C65.6354 16.9527 65.5204 16.9651 65.3899 16.9651C65.1662 16.9651 65.0061 16.9154 64.9098 16.816C64.8135 16.7165 64.7653 16.5612 64.7653 16.3499V14.0194H65.7348V13.227H64.7653ZM70.0975 17.7109H69.2306V13.227H70.0975V17.7109ZM72.7636 11.81V13.227H73.7331V14.0194H72.7636V16.3499C72.7636 16.5612 72.8118 16.7165 72.9081 16.816C73.0044 16.9154 73.1645 16.9651 73.3882 16.9651C73.5187 16.9651 73.6337 16.9527 73.7331 16.9278V17.6736C73.584 17.7295 73.3851 17.7575 73.1365 17.7575C72.7512 17.7575 72.4467 17.6456 72.2229 17.4219C71.9992 17.1982 71.8873 16.8843 71.8873 16.4804V14.0194H71.0297V13.227H71.2721C71.502 13.227 71.6745 13.1633 71.7895 13.0359C71.9044 12.9085 71.9619 12.7422 71.9619 12.5372V11.81H72.7636ZM79.1492 17.0677C78.7577 17.0677 78.4252 16.9278 78.1518 16.6482C77.8845 16.3623 77.7509 15.9677 77.7509 15.4643C77.7509 14.9671 77.8861 14.5771 78.1564 14.2944C78.4268 14.0116 78.7577 13.8702 79.1492 13.8702C79.5407 13.8702 79.8717 14.0116 80.142 14.2944C80.4123 14.5771 80.5475 14.9671 80.5475 15.4643C80.5475 15.9677 80.4123 16.3607 80.142 16.6435C79.8717 16.9263 79.5407 17.0677 79.1492 17.0677ZM77.4992 13.7677C77.9342 13.314 78.4842 13.0872 79.1492 13.0872C79.8142 13.0872 80.3626 13.3124 80.7945 13.763C81.2265 14.2136 81.4424 14.7807 81.4424 15.4643C81.4424 16.1541 81.228 16.7243 80.7992 17.1749C80.3704 17.6254 79.8204 17.8507 79.1492 17.8507C78.478 17.8507 77.928 17.6254 77.4992 17.1749C77.0704 16.7243 76.856 16.1541 76.856 15.4643C76.856 14.7807 77.0704 14.2151 77.4992 13.7677ZM83.4373 17.7109V15.1194C83.4373 14.7651 83.529 14.4715 83.7123 14.2384C83.8957 14.0054 84.152 13.8889 84.4814 13.8889C85.1775 13.8889 85.5255 14.2648 85.5255 15.0168V17.7109H86.4018V14.8677C86.4018 14.3456 86.2635 13.9199 85.9869 13.5906C85.7104 13.2612 85.3142 13.0965 84.7984 13.0965C84.1769 13.0965 83.717 13.3544 83.4187 13.8702V13.227H82.5611V17.7109H83.4373Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M61.3104 28.2038V33.5584H59.8636L59.7294 32.216C59.267 32.9916 58.1782 33.7821 56.4928 33.7821C53.7335 33.7821 51.2874 31.7537 51.2874 28.2635C51.2874 24.7882 53.8677 22.7598 56.6121 22.7598C59.1775 22.7598 60.8182 24.2364 61.385 25.9815L59.6996 26.6228C59.3416 25.4296 58.2975 24.4154 56.6121 24.4154C54.8968 24.4154 53.107 25.6384 53.107 28.2635C53.107 30.8438 54.7775 32.1415 56.5972 32.1415C58.7301 32.1415 59.5355 30.6798 59.625 29.7699H56.1348V28.2038H61.3104ZM64.4874 29.9191C64.4874 31.4255 65.4568 32.231 66.5158 32.231C67.5897 32.231 68.5443 31.4404 68.5443 29.9191C68.5443 28.4126 67.5897 27.6371 66.5158 27.6371C65.4568 27.6371 64.4874 28.4126 64.4874 29.9191ZM66.5158 26.071C64.3531 26.071 62.7572 27.6967 62.7572 29.9191C62.7572 32.1564 64.3531 33.7821 66.5158 33.7821C68.6935 33.7821 70.2894 32.1564 70.2894 29.9191C70.2894 27.6967 68.6935 26.071 66.5158 26.071ZM73.1233 29.9191C73.1233 31.4255 74.0928 32.231 75.1518 32.231C76.2257 32.231 77.1802 31.4404 77.1802 29.9191C77.1802 28.4126 76.2257 27.6371 75.1518 27.6371C74.0928 27.6371 73.1233 28.4126 73.1233 29.9191ZM75.1518 26.071C72.989 26.071 71.3931 27.6967 71.3931 29.9191C71.3931 32.1564 72.989 33.7821 75.1518 33.7821C77.3294 33.7821 78.9253 32.1564 78.9253 29.9191C78.9253 27.6967 77.3294 26.071 75.1518 26.071ZM83.5341 36.616C81.6101 36.616 80.2677 35.4228 80.0738 33.9611L81.6697 33.5435C81.789 34.4384 82.4901 35.1096 83.4894 35.1096C84.8616 35.1096 85.5477 34.4086 85.5477 32.932V32.1713C85.2345 32.7381 84.5036 33.2303 83.4446 33.2303C81.5057 33.2303 80.0887 31.7387 80.0887 29.6954C80.0887 27.7564 81.446 26.1604 83.4446 26.1604C84.5782 26.1604 85.2792 26.6228 85.5924 27.2194V26.2947H87.2629V32.8723C87.2629 34.8113 86.2636 36.616 83.5341 36.616ZM83.728 31.7537C82.5945 31.7537 81.8338 30.9632 81.8338 29.6954C81.8338 28.4574 82.6243 27.652 83.728 27.652C84.8019 27.652 85.5924 28.4574 85.5924 29.6954C85.5924 30.9482 84.8318 31.7537 83.728 31.7537ZM91.1111 22.7598V33.5584H89.3809V22.7598H91.1111ZM94.5565 29.1286C94.6162 28.353 95.2426 27.5177 96.3314 27.5177C97.5246 27.5177 98.0914 28.2784 98.1213 29.1286H94.5565ZM96.4955 32.2906C97.5396 32.2906 98.0765 31.7387 98.3151 31.0228L99.7768 31.4852C99.389 32.753 98.2406 33.7821 96.4955 33.7821C94.5267 33.7821 92.7816 32.3503 92.7816 29.8893C92.7816 27.5923 94.4819 26.071 96.3165 26.071C98.5538 26.071 99.8663 27.5476 99.8663 29.8445C99.8663 30.1279 99.8365 30.3665 99.8216 30.3964H94.5118C94.5565 31.5001 95.4216 32.2906 96.4955 32.2906ZM107.16 27.8459V24.5645H109.024C110.158 24.5645 110.844 25.2059 110.844 26.2201C110.844 27.2194 110.158 27.8459 109.024 27.8459H107.16ZM112.664 26.2052C112.664 28.0696 111.321 29.4269 109.293 29.4269H107.16V33.5584H105.37V22.9835H109.293C111.321 22.9835 112.664 24.3557 112.664 26.2052ZM115.93 33.5584V22.7598H114.2V33.5584H115.93ZM120.181 33.7821C118.66 33.7821 117.72 32.7381 117.72 31.5896C117.72 30.292 118.674 29.576 119.912 29.3971L121.777 29.1137C122.194 29.054 122.314 28.8452 122.314 28.5916C122.314 27.9801 121.896 27.4879 120.942 27.4879C120.032 27.4879 119.525 28.0696 119.45 28.8004L117.869 28.4425C118.003 27.1896 119.137 26.071 120.927 26.071C123.164 26.071 124.014 27.3387 124.014 28.7855L124.016 32.5543C124.022 32.9149 124.051 33.1955 124.074 33.3695L124.104 33.5584H122.493C122.478 33.5137 122.418 33.2154 122.418 32.6337C122.075 33.1855 121.359 33.7821 120.181 33.7821ZM120.509 32.4249C119.823 32.4249 119.45 31.9774 119.45 31.4852C119.45 30.8886 119.883 30.5903 120.42 30.5008L122.314 30.2174V30.5455C122.314 31.9625 121.479 32.4249 120.509 32.4249ZM126.46 36.4967H128.31L132.933 26.2947H131.099L129.145 30.8886L127.057 26.2947H125.103L128.205 32.6933L126.46 36.4967Z"
                                    fill="white"
                                />
                                <path
                                    d="M19.0554 13.1719C19.0029 13.3589 18.9661 13.5596 18.9661 13.7896V32.7268C18.9661 32.9537 19.0015 33.1533 19.053 33.3379L29.6124 23.2683L19.0554 13.1719Z"
                                    fill="#48A0DC"
                                />
                                <path
                                    d="M21.4047 12.4364C20.9132 12.1347 20.4287 12.0592 20.0195 12.1634L30.6231 22.3046L33.7334 19.3391L21.4047 12.4364Z"
                                    fill="#88C057"
                                />
                                <path
                                    d="M38.2789 21.8836L34.9878 20.041L31.6174 23.255L35.051 26.5396L38.2535 24.7697C39.8153 23.8738 39.2448 22.43 38.2789 21.8836Z"
                                    fill="#FFCC66"
                                />
                                <path
                                    d="M30.6063 24.2188L19.9895 34.3418C20.4049 34.4589 20.9006 34.3893 21.4046 34.0799L33.7719 27.2461L30.6063 24.2188Z"
                                    fill="#ED7161"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-5">
                        <Link
                            className="text-black hover:text-gray-500 dark:text-white"
                            href="https://t.me/kazticketkz"
                            target="_blank"
                        >
                            <span className="sr-only">Telegram</span>
                            <svg
                                className="w-6 h-6"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_213_1734)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.43 8.85893C11.2628 9.3444 8.93014 10.3492 5.43189 11.8733C4.86383 12.0992 4.56626 12.3202 4.53917 12.5363C4.49339 12.9015 4.95071 13.0453 5.57347 13.2411C5.65818 13.2678 5.74595 13.2954 5.83594 13.3246C6.44864 13.5238 7.27283 13.7568 7.70129 13.766C8.08994 13.7744 8.52373 13.6142 9.00264 13.2853C12.2712 11.079 13.9584 9.96381 14.0643 9.93977C14.139 9.92281 14.2426 9.90148 14.3128 9.96385C14.3829 10.0262 14.376 10.1443 14.3686 10.176C14.3233 10.3691 12.5281 12.0381 11.5991 12.9018C11.3095 13.171 11.1041 13.362 11.0621 13.4056C10.968 13.5033 10.8721 13.5958 10.78 13.6846C10.2108 14.2333 9.78391 14.6448 10.8036 15.3168C11.2936 15.6397 11.6858 15.9067 12.077 16.1731C12.5042 16.4641 12.9303 16.7543 13.4816 17.1157C13.6221 17.2077 13.7562 17.3034 13.8869 17.3965C14.3841 17.751 14.8307 18.0694 15.3826 18.0186C15.7032 17.9891 16.0345 17.6876 16.2027 16.7884C16.6002 14.6631 17.3816 10.0585 17.5622 8.16097C17.578 7.99473 17.5581 7.78197 17.5422 7.68857C17.5262 7.59518 17.4928 7.46211 17.3714 7.3636C17.2276 7.24694 17.0056 7.22234 16.9064 7.22408C16.455 7.23203 15.7626 7.47282 12.43 8.85893Z"
                                        fill="#2F2F38"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_213_1734">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                        <Link
                            className="text-black hover:text-gray-500 dark:text-white"
                            href="https://www.instagram.com/kazticket.kz"
                            target="_blank"
                        >
                            <span className="sr-only">Instagram</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                        <Link
                            className="text-black hover:text-gray-500 dark:text-white"
                            href="https://www.tiktok.com/@kazticket.kz"
                            target="_blank"
                        >
                            <span className="sr-only">TikTok</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                                />
                            </svg>
                        </Link>
                        <Link
                            className="text-black hover:text-gray-500 dark:text-white"
                            href="https://www.linkedin.com/company/kazticket-kz"
                            target="_blank"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </Link>
                        <Link
                            className="text-black hover:text-gray-500 dark:text-white"
                            href="https://vk.com/kazticketkzz"
                            target="_blank"
                        >
                            <span className="sr-only">ВКонтакте</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.25 16.996h-2.134c-1.205 0-1.409-.687-2.401-1.679-.897-.897-1.395-.209-1.374 1.068.006.339-.161.611-.566.611-1.264 0-3.08.178-4.918-1.806-1.883-2.033-3.857-6.111-3.857-6.513 0-.237.196-.344.524-.344h2.17c.574 0 .623.284.783.649.667 1.521 2.265 4.574 2.69 2.87.244-.978.344-3.245-.703-3.44-.594-.11.452-.746 1.968-.746.377 0 .786.041 1.205.137.769.179.771.523.761 1.026-.039 1.903-.269 3.184.233 3.507.479.31 1.739-1.717 2.403-3.281.183-.433.219-.722.734-.722h2.654c1.39 0-.182 1.997-1.383 3.557-.968 1.255-.916 1.28.209 2.324.803.744 1.75 1.76 1.75 2.336.002.272-.21.446-.748.446z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-lg">KAZTICKET.KZ</span>
                    <nav className="flex flex-col justify-start gap-3">
                        {pages.map((x) => {
                            return (
                                <Link
                                    key={x.url}
                                    href={x.url}
                                    className="text-base leading-6 text-gray-500 hover:text-gray-900 gap-2 dark:text-white flex flex-row items-center"
                                >
                                    {x.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-lg">Партнерам/организаторам</span>
                    <nav className="flex flex-col justify-start gap-3">
                        <Link
                            href={'/offer'}
                            className="text-base leading-6 text-gray-500 hover:text-gray-900 gap-2 dark:text-white flex flex-row items-center"
                        >
                            Организаторам
                        </Link>
                    </nav>
                </div>
            </div>
            <p className="py-6 text-base leading-6 text-center text-gray-400 dark:text-white">
                © {dayjs().format('YYYY')} Kazticket.kz. {locale.Footer.AllRightsReserved}.
            </p>
        </footer>
    );
};

export default Footer;
