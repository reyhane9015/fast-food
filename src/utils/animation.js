export const headerVariants = {
    "offscreen": {
        opacity: 0,
        y: 30
    },
    "onscreen": {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 2,
            
        }
    }
}

export const descVariants = {
    "offscreen": {
        opacity: 0,
        y: 20
    },
    "onscreen": {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 2.3,
            delay: .2,
        }
    }
}

export const btnVariants = {
    "offscreen": {
        opacity: 0,
        y: 20
    },
    "onscreen": {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 2.3,
            delay: .3,
        }
    }
}

export const cardVariants = {
    offscreen: {
      y: 200
    },
    onscreen: {
      y: 20,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
}

export const feautersVariants = (delay) => ({
    "offscreen": {
        opacity: 0,
        y: 30
    },
    "onscreen": {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 2,
            delay
        }
    }
})