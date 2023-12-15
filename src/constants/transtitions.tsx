const transitions = [
    {
        enter: 'transform transition ease-in-out duration-500 sm:duration-700',
        enterFrom: 'opacity-0 translate-x-[-100%]',
        enterTo: 'opacity-100 translate-x-0',
        leave: 'transform transition ease-in-out duration-500 sm:duration-700',
        leaveFrom: 'opacity-100 translate-x-0',
        leaveTo: 'opacity-0 translate-x-full',
    },
    {
        enter: 'transform transition duration-[400ms]',
        enterFrom: 'opacity-0 rotate-[-120deg] scale-50',
        enterTo: 'opacity-100 rotate-0 scale-100',
        leave: 'transform duration-200 transition ease-in-out',
        leaveFrom: 'opacity-100 rotate-0 scale-100',
        leaveTo: 'opacity-0 scale-95',
    },
    {
        enter: 'ease-in-out duration-500',
        enterFrom: 'opacity-0',
        enterTo: 'opacity-100',
        leave: 'ease-in-out duration-500',
        leaveFrom: 'opacity-100',
        leaveTo: 'opacity-0',
    },
    {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        enterTo: 'opacity-100 translate-y-0 sm:scale-100',
        leave: 'ease-in duration-200',
        leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
        leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    },
    {
        enter: 'transition ease-out duration-200',
        enterFrom: 'opacity-0 translate-y-1',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'transition ease-in duration-150',
        leaveFrom: 'opacity-100 translate-y-0',
        leaveTo: 'opacity-0 -translate-y-1',
    },
];

export default transitions;
