function createPartnerCard(organization) {
  const { id, slug } = organization;

  const placeholder =
    "assets/images/organizations/defaults/logo-placeholder.png";

  return ``;
}

export function createSwiperPartnersCardList(athletes) {
  return athletes.map(createPartnerCard).join("");
}
