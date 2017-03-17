<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
<xsl:template match="/">
  <html>
  <body>
    <h2>Visualisation des rubriques des questions au gouvernement par groupes politiques</h2>
	<p><a href="https://github.com/DavidLibeau/Open-Data/tree/master/AN/QuestionsGouvernement" target="_blank">Sources</a></p>
    
    <table border="1">
      <tr>
		<th>Groupe</th>
		<th>Thèmes</th>
      </tr>
    <xsl:for-each select="//questionsGvt/question[not(auteur/groupe/abrege=preceding::auteur/groupe/abrege)]/auteur/groupe/abrege">
      <xsl:variable name="groupe" select="."/>
      <tr>
	      <td>
				<xsl:value-of select="$groupe"/>
				<xsl:text disable-output-escaping="yes"> : </xsl:text>
				<xsl:value-of select="count(//questionsGvt/question[auteur/groupe/abrege=$groupe])"/>
			 </td>
	      <td>
	      <xsl:for-each select="//questionsGvt/question[auteur/groupe/abrege=$groupe and not(indexationAN/rubrique=preceding-sibling::question[auteur/groupe/abrege=$groupe]/indexationAN/rubrique)]/indexationAN/rubrique">
	        <xsl:variable name="rubrique" select="."/>
			<span>
				<xsl:attribute name="style">font-size:<xsl:value-of select="count(//questionsGvt/question[auteur/groupe/abrege=$groupe and indexationAN/rubrique=$rubrique])"/>px</xsl:attribute>
				<xsl:attribute name="title"><xsl:value-of select="$rubrique"/></xsl:attribute>
				<xsl:value-of select="$rubrique"/>
			</span>
	      	<xsl:text disable-output-escaping="yes"> / </xsl:text>
	      </xsl:for-each>
	      </td>
	  </tr>
    </xsl:for-each>
    </table>
	
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>