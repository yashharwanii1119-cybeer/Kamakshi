/**
 * Shared WhatsApp Enquiry Utility for Kamakshi Traders — Solar Solutions
 * Phone Number: +91 70144 93079 (Digits only in URL: 917014493079)
 */

export const WHATSAPP_PHONE = '917014493079';
export const WHATSAPP_DISPLAY_PHONE = '+91 70144 93079';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello Kamakshi Traders — Solar Solutions, I would like to enquire about your solar installation services. Please contact me to discuss my requirements.';

/**
 * Builds a secure, valid WhatsApp click-to-chat URL with correctly encoded query parameters
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp chat in a new browser tab safely
 */
export function openWhatsApp(customMessage?: string): void {
  const url = getWhatsAppUrl(customMessage);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Pre-fills an enquiry message specific to a chosen solar solution
 */
export function getSolutionWhatsAppUrl(solutionTitle: string): string {
  const message = `Hello Kamakshi Traders — Solar Solutions, I am interested in your ${solutionTitle} services. Please share details and arrange a consultation.`;
  return getWhatsAppUrl(message);
}

/**
 * Pre-fills an enquiry message specific to a landmark project or case study
 */
export function getProjectWhatsAppUrl(projectTitle: string, capacity?: string): string {
  const capacityInfo = capacity ? ` (${capacity})` : '';
  const message = `Hello Kamakshi Traders — Solar Solutions, I reviewed your project "${projectTitle}"${capacityInfo} and would like to explore a similar solar installation for our property.`;
  return getWhatsAppUrl(message);
}
