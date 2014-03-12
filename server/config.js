
// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "github"
});
ServiceConfiguration.configurations.insert({
  service: "github",
  clientId: "12858cac802508f45a13",
  secret: "e379ee4f0b4b7113e436dbea9987b04d6b104ba6"
});