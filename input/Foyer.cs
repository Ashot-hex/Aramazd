using Tax.Simulator.Exceptions;

namespace Tax.Simulator;

/// <summary>
/// Model d'un foyer pour le calcul des impôts annuel
/// </summary>
public class Foyer
{
    public static readonly string COUPLE = "Marié/Pacsé";
    public static readonly string CELIBATAIRE = "Célibataire";

    private string situationFamiliale;
    private decimal salairePrincipal;
    private decimal salaireConjoint;
    private int nombreEnfants;

    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    /// <param name="situationFamiliale"> Situation familiale du foyer </param>
    /// <param name="nombreEnfants"> Nombre d'enfants dans le foyer </param>
    /// <param name="salairePrincipal"> Salaire principal du foyer </param>
    /// <param name="salaireConjoint"> Salaire du conjoint, par default à 0 </param>
    /// 
    /// <exception cref="SituationFamilialeInvalide">Si la situation familiale est invalide</exception>
    /// <exception cref="SalaireNegatif">Si le salaire principal, ou celui du conjoint, est invalide</exception>
    /// <exception cref="NombreEnfantsInvalide">Si le nombre d'enfants donnés est invalide</exception>
    public Foyer(string situationFamiliale, int nombreEnfants, decimal salairePrincipal, decimal salaireConjoint = 0)
    {
        this.situationFamiliale = situationFamiliale;
        this.salairePrincipal = salairePrincipal;
        this.salaireConjoint = salaireConjoint;
        this.nombreEnfants = nombreEnfants;

        VerifierValeurs();
    }

    /// <summary>
    /// Verifie que tout les attributs ont étés correctement définit
    /// </summary>
    /// <exception cref="SituationFamilialeInvalide">Si la situation familiale est invalide</exception>
    /// <exception cref="SalaireNegatif">Si le salaire principal, ou celui du conjoint, est invalide</exception>
    /// <exception cref="NombreEnfantsInvalide">Si le nombre d'enfants donnés est invalide</exception>
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

    /// <summary>
    /// Obtient le salaire total du foyer
    /// </summary>
    public decimal SalaireMensuelTotal => salairePrincipal + salaireConjoint;

    /// <summary>
    /// Obtient les parts fiscales du foyer
    /// </summary>
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