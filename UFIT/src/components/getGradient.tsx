export const getGradientColors = (programCategory: string) => {
    switch (programCategory) {
        case 'strength':
            return ['#2E34BC', '#EA9CFD'];
        case 'yoga':
            return ['#581868', '#FD9C9C'];
        case 'cardio':
            return ['#0D6817', '#FFEB3A'];
        case 'weight loss':
            return ['#0D6817', '#FFEB3A'];
        default:
            return ['black', 'white'];
    }
};