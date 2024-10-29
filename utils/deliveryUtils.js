export const getCurrentTime = () => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  };
  
  export const getDeliveryEstimate = (pincode, stockStatus, pincodes) => {
    const providers = {
      'Provider A': { cutoff: 17, sameDay: true },
      'Provider B': { cutoff: 9, sameDay: true },
      'General Partners': { cutoff: null, sameDay: false },
    };
  
    const pincodeInfo = pincodes.find(item => item.Pincode === pincode);
  
    if (!pincodeInfo) {
      return { error: 'Invalid pincode' };
    }
  
    const provider = pincodeInfo.LogisticsProvider;
    const { hours, minutes, seconds } = getCurrentTime();
    let deliveryDate = new Date();
    let countdown = '';
  
    if (provider === 'Provider A') {
      if (hours < providers['Provider A'].cutoff && stockStatus === 'true') {
        const remainingTime = (providers['Provider A'].cutoff * 3600) - (hours * 3600 + minutes * 60 + seconds);
        countdown = remainingTime;
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
    } else if (provider === 'Provider B') {
      if (hours < providers['Provider B'].cutoff) {
        const remainingTime = (providers['Provider B'].cutoff * 3600) - (hours * 3600 + minutes * 60 + seconds);
        countdown = remainingTime;
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
    } else {
      const deliveryDays = parseInt(pincodeInfo.TAT, 10);
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    }
  
    return {
      date: deliveryDate.toDateString(),
      countdown,
      provider,
    };
  };