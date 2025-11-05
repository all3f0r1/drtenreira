import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export function MapLocations() {
  const locations = [
    {
      name: "Bruxelles",
      address: "Centre Le Lotus, Boulevard des Invalides 72, 1160 Bruxelles",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Boulevard+des+Invalides+72+1160+Bruxelles",
    },
    {
      name: "Ophain",
      address: "Rue du Hautmont 29, 1421 Ophain (Braine L'Alleud)",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rue+du+Hautmont+29+1421+Ophain+Braine+L'Alleud",
    },
  ];

  return (
    <div className="space-y-6">
      {locations.map((location, index) => (
        <div key={index} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                {location.name}
              </h4>
              <p className="text-muted-foreground text-sm mb-4" style={{ lineHeight: "1.6" }}>
                {location.address}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-accent/10 transition-all group"
                onClick={() => window.open(location.googleMapsUrl, "_blank")}
              >
                Voir sur Google Maps
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
