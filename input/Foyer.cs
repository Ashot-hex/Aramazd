using Tax.Simulator.Exceptions;

namespace Tax.Simulator;

public class Foyer
{
    public static readonly string COUPLE = "Marié/Pacsé";
    public static readonly string CELIBATAIRE = "Célibataire";

    private string situationFamiliale;
    private decimal salairePrincipal;
    private decimal salaireConjoint;
    private int nombreEnfants;

    public Foyer(string situationFamiliale, int nombreEnfants, decimal salairePrincipal, decimal salaireConjoint = 0)
    {
        this.situationFamiliale = situationFamiliale;
        this.salairePrincipal = salairePrincipal;
        this.salaireConjoint = salaireConjoint;
        this.nombreEnfants = nombreEnfants;

        VerifierValeurs();
    }

    private void VerifierValeurs()
    {
        if (situationFamiliale != CELIBATAIRE && situationFamiliale != COUPLE)
        {
            throw new SituationFamilialeInvalide();
        }

        if (salairePrincipal <= 0)
        {
            throw new SalaireNegatif();
        }

        if (situationFamiliale == COUPLE && salaireConjoint < 0)
        {
            throw new SalaireNegatif();
        }

        if (nombreEnfants < 0)
        {
            throw new NombreEnfantsInvalide();
        }
    }

    public decimal SalaireMensuelTotal => salairePrincipal + salaireConjoint;

    public decimal PartsFiscales
    {
        get
        {
            int baseQuotient = situationFamiliale == COUPLE ? 2 : 1;
            decimal quotientEnfants = 0m;

            if (nombreEnfants <= 2)
            {
                quotientEnfants = nombreEnfants / 2m;
            }
            else
            {
                quotientEnfants = 1.0m + (nombreEnfants - 2) * 0.5m;
            }

            return baseQuotient + quotientEnfants;
        }
    }
}